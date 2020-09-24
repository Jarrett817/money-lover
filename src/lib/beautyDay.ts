import dayjs from "dayjs";

function beautyDay(date: string) {
    return dayjs(date).format("YYYY-MM-DD");
}
export default beautyDay