const localStorageKeyName = "tagList";
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => "success" | "duplicated";
    save: () => void;
    update: (id: string, name: string) => "success" | "not found" | "duplicated";
    remove: (id: string) => boolean;
}
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name: string) {

        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return "duplicated";
        }
        this.data.push({id: name, name: name});
        this.save();
        return "success";
    },
    update(id: string, name: string) {
        //获取对应id的对象
        const idList = this.data.map(item => item.id);
        //如果取到的id在data数组中存在就取出对应的tag对象的名字
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            //如果新输入的名字与原有名字相同，返回重复提示，否则找出该对象，替换名字重新保存
            if (names.indexOf(name) >= 0) {
                return "duplicated";
            } else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return "success";
            }
        } else {
            return "not found";
        }
    },
    remove(id: string) {
        const tagObj = this.data.filter(item => item.id === id)[0];
        const index = this.data.indexOf(tagObj);
        this.data.splice(index, 1);
        console.log(this.data)
        this.save();
        return true;
    }
};
export {tagListModel} ;