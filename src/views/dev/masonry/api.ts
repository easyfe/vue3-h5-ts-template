import request from "@/packages/request/index";

export function testList(params: Record<string, any>): Promise<{ title: string }> {
    return request({
        url: "https://gdsc.88360.com/baseapi/platform/goods/index",
        params
    });
}
