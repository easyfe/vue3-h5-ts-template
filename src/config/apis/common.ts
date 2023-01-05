import request from "@/packages/request";

/**
 * 上传图片
 * @param file
 * @returns
 */
export function uploadImage(file: HTMLFormElement): Promise<{
    path_name: string;
}> {
    const data = new FormData();
    //这里需要注意，后端接文件的name是什么，一般是image、file
    data.append("image", file.file);
    data.append("type", "folder");
    return request({
        url: "https://syytshopmax.v2.syy.nbseo.cn/baseapi/platform/file/uploadImage",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        enableCancel: false,
        timeout: 0,
        data
    });
}

/**
 * 获取省市区地址
 * @returns
 */
export function getArea(): Promise<_RegArea[]> {
    return request({
        // url: "/config/areaData",
        url: "https://syycdn.dongchali.net/file/agent-config/prod/agent_region.json",
        method: "GET",
        enableCancel: false
    });
}

export interface _RegArea {
    area_id: number;
    value: number;
    label: string;
    children: _RegArea;
}

/**
 * 根据经纬度获取地理信息
 * @param lat
 * @param lng
 * @returns
 */
export function getLocalByLatitude(lat: number, lng: number): Promise<LocationByLatitude> {
    return request({
        url: `https://syytshopmax.v2.syy.nbseo.cn/baseapi/app/address/getLocalByLatitude?lat=${lat}&lng=${lng}`,
        notify: false
    });
}

export interface LocationByLatitude {
    //国家
    nation: string;
    //省
    province: string;
    //市
    city: string;
    //区
    district: string;
    //街道
    street: string;
    //号牌
    street_number: string;
    //纬度
    lat: string;
    //经度
    lng: string;
    regions: Regions;
}

export interface Regions {
    //区
    region: string;
    //区ID
    region_id: number;
    //市
    city: string;
    //市ID
    city_id: number;
    //省
    province: string;
    //省ID
    province_id: number;
}

/**
 * 腾讯坐标转换
 * @param params
 * @returns
 */
export function translateGeoLocation(params: {
    key?: string;
    //纬度前，经度后，纬度和经度之间用",“分隔，每组坐标之间使用”;"分隔；
    locations: string;
    //输入的locations的坐标类型，可选值：1 GPS坐标 2 sogou经纬度 3 baidu经纬度 4 mapbar经纬度 6 sogou墨卡托
    type: number;
}): Promise<{
    //0 成功，其他失败，详见：https://lbs.qq.com/service/webService/webServiceGuide/status
    status: number;
    //坐标数组
    locations: { lng: number; lat: number }[];
}> {
    params.key = "GQ7BZ-VAXWX-R7R4H-T4VL6-XNL73-BXBWW";
    return request({
        url: "https://apis.map.qq.com/ws/coord/v1/translate",
        params
    });
}
