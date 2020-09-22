//全局定义变量类型
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdTime: string;
}
type Tag = {
    id: string;
    name: string;
}
type DetailedRecord = {
    date: string;
    total?: number ;
    items: RecordItem[];
};

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    chosenTag?: Tag;
    sortedList: DetailedRecord[];
    currentType: string;
    currentRecord?: RecordItem;
    dailyList: RecordItem[];
}
