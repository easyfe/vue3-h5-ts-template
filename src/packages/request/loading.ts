import { Toast } from "vant";
let reqNum = 0;
const loading = {
    showToast(message: string): void {
        Toast({
            message
        });
    },
    showLoading(): void {
        if (reqNum === 0) {
            Toast.loading({
                duration: 0
            });
        }
        reqNum++;
    },
    clearLoading(): Promise<boolean> {
        /** 合并loading */
        return new Promise((resolve) => {
            setTimeout(() => {
                closeLoading();
                resolve(true);
            }, 300);
        });
    },
    clearToast(): void {
        Toast.clear();
    }
};
/** 关闭loading */
function closeLoading(): void {
    if (reqNum <= 0) {
        return;
    }
    reqNum--;
    if (reqNum === 0) {
        Toast.clear();
    }
}

export default loading;
