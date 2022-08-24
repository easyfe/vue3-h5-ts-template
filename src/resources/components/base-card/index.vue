<template>
    <div class="card-body">
        <wrapper :cell-config="config">
            <template #default-content>
                <cell :cell-config="config"></cell>
            </template>
        </wrapper>
    </div>
</template>

<script lang="ts" setup>
import cell from "@/resources/components/base-card/components/cell.vue";
import wrapper from "@/resources/components/base-card/components/wrapper.vue";
import { CardProp } from "@/types";

defineProps({
    config: {
        type: Object
    }
});
</script>

<style lang="scss" scoped>
.card-body {
    width: 100%;
    margin-bottom: 20px;
}
</style>
