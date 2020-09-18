import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [],
        chosenTag: undefined,
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.chosenTag = state.tagList.filter(t => t.id === id)[0];
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
            store.commit("saveRecords");
        },
        saveRecords(state) {
            window.localStorage.setItem("recordList",
                JSON.stringify(state.recordList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return "duplicated";
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            window.alert("添加成功！");
        },
        saveTags(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },
        removeTags(state, id: string) {
            const tagObj = state.tagList.filter(item => item.id === id)[0];
            const index = state.tagList.indexOf(tagObj);
            state.tagList.splice(index, 1);
            console.log(state.tagList);
            store.commit("saveTags");
            router.back();
        },
        updateTags(state, payload: { id: string; newName: string }) {
            const {id, newName} = payload;
            //获取对应id的对象
            const idList = state.tagList.map(item => item.id);
            //如果取到的id在data数组中存在就取出对应的tag对象的名字
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                //如果新输入的名字与原有名字相同，返回重复提示，否则找出该对象，替换名字重新保存
                if (names.indexOf(newName) >= 0) {
                    alert("标签名重复");
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
    actions: {},
    modules: {}
});

export default store;