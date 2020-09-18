//全局定义变量
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}
type Tag = {
    id: string;
    name: string;
}
type RootState={
    recordList: RecordItem[];
    tagList: Tag[];
    chosenTag?: Tag;
}