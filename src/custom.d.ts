//全局定义变量类型
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdTime?: string;
}
type Tag = {
    id: string;
    name: string;
}

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    chosenTag?: Tag;
    sortedList: detailedRecord[];
}
type DetailedRecord = {
    date: string;
    total?: number;
    items: RecordItem[];
};
