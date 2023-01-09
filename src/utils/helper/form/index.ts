import { BaseFormArea, BaseFormDate, BaseFormDateExtra, BaseFormInput, BaseFormUploader } from "types/form";

const formHelper = {
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
            inputType: "datetime",
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
    }
};
export default formHelper;
