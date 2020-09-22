import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import dayjs from "dayjs";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [],
        chosenTag: undefined,
        sortedList: [],
        currentType: "-",
        currentRecord: undefined,
        dailyList: []
    } as RootState,
    mutations: {
        setCurrentRecord(state, payload: { groupIndex: number; itemIndex: number }) {
            //直接获取对应类型的记录
            store.commit("fetchRecords");
            store.commit("SortList", state.currentType);
            //重新筛选完
            const {groupIndex, itemIndex} = payload;
            state.currentRecord = state.sortedList[groupIndex].items[itemIndex];

        },
        changeCurrentType(state, type: string) {
            state.currentType = type;
        },
        SortList(state, type: string) {
            //筛选出同类型的记录进行排序
            const newList: RecordItem[] = state.recordList.filter(r => r.type === type).sort((a, b) =>
                dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf());
            //如果记录不存在就返回
            if (!newList[0]) {
                state.sortedList = [];
                return;
            }
            const result: DetailedRecord[] = [{
                date: dayjs(newList[0].createdTime).format("YYYY-MM-DD"),
                total: 0,
                items: [newList[0]]
            }];

            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.date).isSame(dayjs(current.createdTime), "day")) {
                    last.items.push(current);
                } else {
                    result.push({date: dayjs(current.createdTime).format("YYYY-MM-DD"), total: 0, items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => {
                    return sum + item.amount;
                }, 0);
            });
            state.sortedList = result;
        },


        setCurrentTag(state, id: string) {
            state.chosenTag = state.tagList.filter(t => t.id === id)[0];
        }
        ,
        removeRecord(state, createdTime: string) {
            store.commit("fetchRecords");
            const recordObj = state.recordList.filter(item => {
                    return item.createdTime === createdTime;
                }
            )[0];
            const index = state.recordList.indexOf(recordObj);
            state.recordList.splice(index, 1);
            store.commit("saveRecords");
            router.back();
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        }
        ,
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createdTime = new Date().toISOString();
            state.recordList.push(record2);
            store.commit("saveRecords");
        }
        ,
        saveRecords(state) {
            window.localStorage.setItem("recordList",
                JSON.stringify(state.recordList));
        }
        ,
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
        }
        ,
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return "duplicated";
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit("saveTags");
            window.alert("添加成功！");
        }
        ,
        saveTags(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        }
        ,
        removeTags(state, id: string) {
            const tagObj = state.tagList.filter(item => item.id === id)[0];
            const index = state.tagList.indexOf(tagObj);
            state.tagList.splice(index, 1);

            store.commit("saveTags");
            router.back();
        }
        ,
        updateTags(state, payload: {
            id: string;
            newName: string;
        })
        {
            const {id, newName} = payload;
            //获取对应id的对象
            const idList = state.tagList.map(item => item.id);
            //如果取到的id在data数组中存在就取出对应的tag对象的名字
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                //如果新输入的名字与原有名字相同，返回重复提示，否则找出该对象，替换名字重新保存
                if (names.indexOf(newName) >= 0) {
                    alert("标签已存在！");
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = newName;
                    store.commit("saveTags");
                }
            } else {
                return "not found";
            }
        }

    },
    actions: {}
    ,
    modules: {}
});

export default store;