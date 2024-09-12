import { BaseFormArea, BaseFormDate, BaseFormDateExtra, BaseFormInput, BaseFormUploader } from "types/form";
import { FieldProps, PickerProps, CalendarProps, FormInstance } from "vant";

const formHelper = {
    validate(value: FormInstance) {
        return new Promise((resolve, reject) => {
            value
                .validate()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    input(label: string, name: string, extra?: BaseFormInput) {
        return {
            inputType: "input",
            label,
            name,
            ...extra
        };
    },
    action(label: string, name: string, options: Record<string, any>[], extra?: BaseFormInput) {
        return {
            inputType: "action",
            label,
            name,
            options,
            ...extra
        };
    },
    date(label: string, name: string, options: BaseFormDate, extra?: BaseFormDateExtra) {
        return {
            inputType: "date",
            label,
            name,
            options,
            ...extra
        };
    },
    checkbox(label: string, name: string, options: Record<string, any>[], extra?: BaseFormInput) {
        return {
            inputType: "checkbox",
            label,
            name,
            options,
            ...extra
        };
    },
    radio(label: string, name: string, options: Record<string, any>[], extra?: BaseFormInput) {
        return {
            inputType: "radio",
            label,
            name,
            options,
            ...extra
        };
    },
    switch(label: string, name: string, extra?: BaseFormInput) {
        return {
            inputType: "switch",
            label,
            name,
            ...extra
        };
    },
    area(label: string, name: string, extra?: BaseFormArea) {
        return {
            inputType: "area",
            label,
            name,
            ...extra
        };
    },
    uploader(label: string, name: string, extra?: BaseFormUploader) {
        return {
            inputType: "uploader",
            label,
            name,
            ...extra
        };
    },
    picker(label: string, name: string, options: Partial<PickerProps>, extra?: BaseFormInput) {
        return {
            inputType: "picker",
            label,
            name,
            options,
            ...extra
        };
    },
    calendar(
        label: string,
        name: string,
        options: Partial<CalendarProps>,
        extra?: BaseFormInput & { format?: (e: any) => string }
    ) {
        return {
            inputType: "calendar",
            label,
            name,
            options,
            ...extra
        };
    },
    slot(name: string, extra?: BaseFormInput) {
        return {
            inputType: "slot",
            name,
            ...extra
        };
    }
};
export default formHelper;
