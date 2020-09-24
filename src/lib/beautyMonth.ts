import dayjs from "dayjs";

function beautyMonth(date: string) {
    return dayjs(date).month();
}
export default beautyMonth