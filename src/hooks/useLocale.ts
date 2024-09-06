import { showToast } from "vant";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useLocale() {
    const i18 = useI18n();
    const currentLocale = computed(() => {
        return i18.locale.value;
    });
    const changeLocale = (value: string) => {
        if (i18.locale.value === value) {
            return;
        }
        i18.locale.value = value;
        localStorage.setItem("vant-locale", value);
        showToast({
            type: "success",
            message: i18.t("语言")
        });
    };
    return {
        currentLocale,
        changeLocale
    };
}
