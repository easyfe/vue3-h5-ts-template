<template>
    <van-field class="base-uploader" v-bind="$attrs" v-on="$attrs">
        <template #input>
            <van-uploader
                ref="uploaderControl"
                v-model="fileList"
                v-bind="options"
                multiple
                :max-size="maxSize"
                :after-read="afterRead"
                :max-count="maxCount"
                :upload-text="uploadText"
                :upload-icon="uploadIcon"
                @oversize="onOversize"
                @delete="delUpload"
            >
            </van-uploader>
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseUploader">
import { uploadImage } from "@/config/apis/common";
import { Toast } from "vant";
import { nanoid } from "nanoid";
const props = defineProps({
    /**  { url: string }[]; */
    modelValue: {
        type: Array,
        required: true,
        default: () => {
            return [];
        }
    },
    options: {
        type: Object,
        default: () => {
            return {};
        }
    },
    //自定义文字
    uploadText: {
        type: String,
        default: ""
    },
    // 自定义图片
    uploadIcon: {
        type: String,
        default: "photograph"
    },
    // 限制文件上传数量
    maxCount: {
        type: Number,
        default: 5
    },
    //默认最大10MB
    maxSize: {
        type: Number,
        default: 10 * 1024 * 1024
    }
});

//上传图片
let fileList = ref<{ file?: File; status?: string; message?: string; content?: string; id: string; url?: string }[]>(
    []
);
//上传结果
let fileListRes = ref<{ url: string; id: string }[]>([]);

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

/** 文件大小超过限制时触发 */
const onOversize = (): void => {
    Toast("文件大小不能超过 10M");
};
/** 删除图片文件 */
const delUpload = (file: { id: string }): void => {
    if (file.id) {
        fileListRes.value.splice(
            fileListRes.value.findIndex((item) => item.id === file.id),
            1
        );
        emits("update:modelValue", fileListRes);
    }
};
/** 异步上传图片 */
const afterRead = async (file: any): Promise<void> => {
    let arr = [];
    if (Array.isArray(file)) {
        arr = file;
    } else {
        arr.push(file);
    }
    arr.forEach((item) => {
        item.message = "上传中";
        item.status = "uploading";
        item.id = nanoid();
        uploadImage(item)
            .then((res) => {
                const { path_name } = res;
                item.status = "done";
                item.message = "上传成功";
                item.url = path_name;
                fileListRes.value.push({
                    id: item.id,
                    url: path_name
                });
                emits("update:modelValue", fileListRes);
            })
            .catch(() => {
                item.status = "failed";
                item.message = "上传失败";
            });
    });
};

onMounted(() => {
    if (props.modelValue?.length) {
        fileList.value.length = 0;
        fileListRes.value.length = 0;
        props.modelValue.forEach((item: any) => {
            const id = nanoid();
            fileList.value.push({
                url: item.url,
                id: id
            });
            fileListRes.value.push({
                url: item.url,
                id: id
            });
        });
    }
});
</script>

<style lang="scss" scoped>
.base-uploader::after {
    border-color: #ededed;
}
</style>
