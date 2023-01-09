import type { FieldProps, ActionSheetProps, DatePickerProps, CascaderProps, UploaderProps, FieldRule } from "vant";
export type BaseFormExtra = {
    if?: boolean | ((...args: any) => boolean);
    rules?: FieldRule[];
};

//文本输入框
export type BaseFormInput = Partial<FieldProps> & BaseFormExtra;
//动作面板
export type BaseFormAction = Partial<ActionSheetProps> & BaseFormExtra;
//日期选择
export type BaseFormDate = Partial<DatePickerProps>;
export type BaseFormDateExtra = Partial<FieldProps> & BaseFormExtra & { format?: string; sourceFormat?: string };
//地区选择
export type BaseFormArea = Partial<CascaderProps> & BaseFormExtra;
//上传组件
export type BaseFormUploader = Partial<UploaderProps> & BaseFormExtra;
