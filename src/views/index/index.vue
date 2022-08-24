<template>
    <frame-view :tabbar="true">
        <router-link to="/dev" class="title">前往开发者工具</router-link>
    </frame-view>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.title {
    font-size: 75px;
}
</style>
