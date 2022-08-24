import dayjs from "dayjs";
import typeHelper from "../type";
const dateHelper = {
    /**
     * 时间格式化
     * @param date 时间
     * @param format 格式,如：YYYY-MM-DD
     * @returns
     */
    formatDate: (date: number | string | Date | dayjs.Dayjs, format = "YYYY-MM-DD"): string => {
        let DATE = "";
        //秒
        if ((typeHelper.isNumber(date) || typeHelper.isString(date)) && String(date).length === 10) {
            DATE = dayjs.unix(Number(date)).format(format);
        }
        //毫秒
        else if ((typeHelper.isNumber(date) || typeHelper.isString(date)) && String(date).length === 13) {
            DATE = dayjs(Number(date)).format(format);
        } else {
            DATE = dayjs(date).format(format);
        }
        return DATE;
    },
    /**
     * 字符串时间转时间戳
     * @param date 时间
     * @returns
     */
    toUnix: (date: number | string | Date | dayjs.Dayjs): number => {
        return dayjs(date).unix();
    },
    /**
     * 转Date格式
     * @param date
     */
    toDate: (date: number | string | Date | dayjs.Dayjs): Date => {
        if (typeHelper.isString(date) || typeHelper.isNumber(date)) {
            if (date.toString().length === 10) {
                date = Number(date) * 1000;
            }
        }
        return dayjs(date).toDate();
    }
};
export default dateHelper;
