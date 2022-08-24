import indexActive from "@/assets/images/tabbar/index-active@2x.png";
import indexInactive from "@/assets/images/tabbar/index@2x.png";
import deliverActive from "@/assets/images/tabbar/deliver-active@2x.png";
import deliverInactive from "@/assets/images/tabbar/deliver@2x.png";
import recruitActive from "@/assets/images/tabbar/recruit-active@2x.png";
import recruitInactive from "@/assets/images/tabbar/recruit@2x.png";
import stimulateActive from "@/assets/images/tabbar/stimulate-active@2x.png";
import stimulateInactive from "@/assets/images/tabbar/stimulate@2x.png";
import userActive from "@/assets/images/tabbar/user-active@2x.png";
import userInactive from "@/assets/images/tabbar/user@2x.png";
const tabbar = [
    {
        router: "/index",
        title: "首页",
        inactive: indexInactive,
        active: indexActive
    },
    {
        router: "/category",
        title: "分类",
        inactive: deliverInactive,
        active: deliverActive
    },
    {
        router: "/business/index",
        title: "会员",
        inactive: recruitInactive,
        active: recruitActive
    },
    {
        router: "/card",
        title: "购物车",
        inactive: stimulateInactive,
        active: stimulateActive
    },
    {
        router: "/user",
        title: "我的",
        inactive: userInactive,
        active: userActive
    }
];
export default tabbar;
