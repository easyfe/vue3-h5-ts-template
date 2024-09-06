import { nanoid } from "nanoid";
import WebRequest from "@easyfe/web-request";
import loading from "./loading";
import { errorLogout } from "@/views/utils";

const service = new WebRequest({
    base: {
        timeout: 15 * 1000,
        baseURL: "",
        prefix: "",
        enableCancel: false
    },
    loading,
    interceptors: {
        request: (config): Promise<any> => {
            if (config.method?.toLocaleUpperCase() === "GET") {
                config.params = {
                    ...config.params,
                    _t: nanoid()
                };
            }
            return Promise.resolve(config);
        },
        response: (response): Promise<any> => {
            if (response.config.url?.includes("apis.map.qq.com")) {
                return Promise.resolve(response.data);
            }
            if (response.config.url?.includes("jsonplaceholder.typicode.com")) {
                return Promise.resolve(response.data);
            }
            return Promise.resolve(response.data.data);
        },
        responseError: (errorResponse): Promise<any> => {
            if (errorResponse.status === 401) {
                errorResponse.config.notify = false;
                errorLogout();
            }
            return Promise.reject(errorResponse);
        }
    }
});

const request = service.request;

export function clearRequest(): void {
    service.clearQueue();
}

export default request;
