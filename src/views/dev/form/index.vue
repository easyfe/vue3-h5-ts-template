<template>
    <frame-view class="form">
        <h1>form表单（设置表单的对齐方式）</h1>
        <van-cell>
            <base-form ref="form" key="1" v-model="form1" :config="formItems1"> </base-form>
            <van-cell class="footer">
                <van-button block round type="danger" @click="submit1">表单提交</van-button>
            </van-cell>
        </van-cell>

        <h1>form表单(单个表单表单项设置对齐方式)</h1>
        <base-input v-model="form5.name" v-bind="group5"></base-input>

        <h1>form表单(带表单校验)</h1>
        <van-cell>
            <base-form ref="baseForm2" key="2" v-model="form2" :config="formItems2"></base-form>
            <van-cell class="footer">
                <van-button block round type="danger" @click="submit2">表单提交</van-button>
            </van-cell>
        </van-cell>

        <h1>form表单(插槽)</h1>
        <base-form key="3" v-model="form3" :config="formItems3">
            <!-- 自定义上传样式 -->
            <template #total>
                <van-field v-model.trim="form3.total" label="自定义" placeholder="请输入" clearable> </van-field>
            </template>
        </base-form>

        <h1>form表单(使用单个表单控件)</h1>
        <base-uploader v-model="form4.file" v-bind="group4" :upload-end="uploadEnd">
            <!-- 通过默认插槽可以自定义上传区域的样式。 -->
            <template #uploader>
                <span>上传文件</span>
            </template>
        </base-uploader>
    </frame-view>
</template>

<script setup lang="ts">
import formHelper from "@/utils/helper/form";
import { showToast } from "vant";

const baseForm2 = ref<any>(null);
const form1 = reactive({
    total: "这是初始化值并禁用",
    gender: "1",
    datetime: 1658744420,
    region: [1, 2, 4],
    file: [{ url: "https://img01.71360.com/file/read/www2/M00/08/76/wKj2K2LeVBKALAxVAAGMb5ulYJw384.jpg" }],
    checkbox: ["2"],
    radio: "1",
    switch: true,
    describe: ""
});

const form2 = reactive({
    total: "",
    gender: "",
    datetime: "",
    region: [],
    file: [],
    checkbox: [],
    radio: "",
    switch: "",
    describe: ""
});

const form3 = reactive({
    total: "",
    gender: "",
    datetime: "",
    region: [],
    file: [],
    checkbox: [],
    radio: "",
    switch: "",
    describe: ""
});

const form4 = reactive({
    file: []
});

const group4 = reactive({
    label: "文件上传"
});

const form5 = reactive({
    name: ""
});

const group5 = reactive({
    label: "姓名",
    labelAlign: "left", //表单项 label 对齐方式，可选值为 left center right
    inputAlign: "right", //输入框对齐方式，可选值为left center right
    errorMessageAlign: "right" //错误提示文案对齐方式，可选值为left center right
});

const validator = (val: any, rule: any): boolean => {
    if (val == "") {
        rule.message = "请输入金额";
        return false;
    }
    if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(val)) {
        rule.message = "金额只能是数字";
        return false;
    }
    return true;
};
const formItems1 = computed(() => {
    return [
        formHelper.input("总商品金额", "total", {
            readonly: true,
            disabled: true
        }),
        formHelper.action("性别", "gender", [
            { name: "男", value: "1" },
            { name: "女", value: "2" }
        ]),
        formHelper.date(
            "日期",
            "datetime",
            {
                columnsType: ["year", "month", "day"],
                title: "选择年月",
                formatter: (type, option) => {
                    if (type === "year") {
                        option.text += "年";
                    }
                    if (type === "month") {
                        option.text += "月";
                    }
                    if (type === "day") {
                        option.text += "日";
                    }
                    return option;
                }
            },
            {
                format: "YYYY年/MM月/DD日"
            }
        ),
        formHelper.area("地区", "region", {
            fieldNames: {
                text: "label",
                value: "value",
                children: "children"
            }
        }),
        formHelper.uploader("文件上传", "file", {
            maxCount: 3,
            maxSize: 10 * 1024 * 1024
        }),
        formHelper.checkbox("复选框", "checkbox", [
            { label: "复选框 1", value: "1" },
            { label: "复选框 2", value: "2" }
        ]),
        formHelper.radio("单选框", "radio", [
            { label: "单选框1", value: "1" },
            { label: "单选框2", value: "2" }
        ]),
        formHelper.switch("开关", "switch"),
        formHelper.input("描述", "describe", {
            type: "textarea",
            clearable: true,
            rules: [
                {
                    required: true,
                    message: "必填项"
                }
            ],
            placeholder: "请填写描述",
            maxlength: "50", //输入的最大字符数
            showWordLimit: true //是否显示字数统计，需要设置maxlength属性
        })
    ];
});

const formItems2 = reactive([
    {
        name: "total",
        label: "总商品金额2",
        readonly: false,
        inputType: "input",
        required: true,
        rules: [{ validator: validator }]
    },
    {
        name: "gender",
        label: "性别",
        inputType: "select",
        options: [
            { name: "男", value: "1" },
            { name: "女", value: "2" }
        ],
        labelAlign: "left",
        rules: [{ required: true }]
    },
    {
        name: "datetime",
        label: "日期",
        inputType: "datetime",
        options: {
            type: "time"
        },
        labelAlign: "left"
    },
    {
        name: "region",
        label: "地区",
        inputType: "area",
        labelAlign: "left"
    },
    {
        name: "file",
        label: "文件上传",
        inputType: "uploader",
        labelAlign: "left"
    },
    {
        name: "checkbox",
        label: "复选框",
        inputType: "checkbox",
        options: [
            { label: "复选框 1", value: "1" },
            { label: "复选框 2", value: "2" }
        ],
        labelAlign: "left"
    },
    {
        name: "radio",
        label: "单选框",
        inputType: "radio",
        options: [
            { label: "单选框1", value: "1" },
            { label: "单选框2", value: "2" }
        ],
        labelAlign: "left"
    },
    {
        name: "switch",
        label: "开关",
        inputType: "switch",
        labelAlign: "left"
    },
    {
        name: "describe",
        label: "描述",
        inputType: "textarea",
        maxlength: "50", //输入的最大字符数
        showWordLimit: true, //是否显示字数统计，需要设置maxlength属性
        rules: [{ required: true, message: "请填写用户名" }]
    }
]);
const formItems3 = reactive([
    {
        name: "total",
        inputType: "slot"
    }
]);

const form = ref();

const submit1 = (): void => {
    form.value
        .validate()
        .then((res: any) => {
            console.log("res", res);
            showToast("校验通过");
        })
        .catch(() => {
            console.log("表单校验未通过");
            showToast("校验失败");
        });
};

const submit2 = (): void => {
    baseForm2.value
        .validate()
        .then((res: any) => {
            console.log("res", res);
        })
        .catch(() => {
            console.log("表单校验未通过");
        });
};
/** 上传完成回调 */
const uploadEnd = (): void => {
    console.log("上传完成回调 ");
};
</script>

<style lang="scss" scoped>
.form {
    h1 {
        font-size: 36px;
    }
}
</style>
