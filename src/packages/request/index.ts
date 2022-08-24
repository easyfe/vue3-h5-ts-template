import { nanoid } from "nanoid";
import SyyRequest from "@syyfe/request";
import loading from "./loading";
import lodash from "@/utils/tools/lodash";

const service = new SyyRequest({
    base: {
        timeout: 15 * 1000,
        baseURL: "",
        prefix: ""
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
            response.data.message = response.data.msg;
            if (response.config.url?.includes("jsonplaceholder.typicode.com")) {
                response.data.data = lodash.cloneDeep(response.data);
            }
            return Promise.resolve(response);
        },
        responseError: (errorResponse): Promise<any> => {
            errorResponse.data.message = errorResponse.data.msg;
            return Promise.reject(errorResponse);
        }
    }
});

const request = service.request;

export function clearRequest(): void {
    service.clearQueue();
}

export default request;
