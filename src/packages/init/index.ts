import { _TouchEvent } from "types";
import root from "@/config/pinia/root";
import VConsole from "vconsole";
import envHelper from "@/utils/helper/env";

/** 监听浏览器后退事件 */
const handleListenBack = (): void => {
    window.addEventListener(
        "popstate",
        () => {
            root().SET_TRANSITION("slide-left");
            root().SET_ISBACK(true);
        },
        false
    );
};
/** 禁止页面级的touchmove事件 */
const disableTouchMove = (): void => {
    document.body.addEventListener(
        "touchmove",
        function (e: _TouchEvent) {
            if (e._isScroller) return;
            // 阻止默认事件
            e.preventDefault();
        },
        {
            passive: false
        }
    );
};

handleListenBack();
disableTouchMove();

if (!envHelper.prod()) {
    new VConsole();
}
