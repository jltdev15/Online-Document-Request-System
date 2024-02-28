<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
    <the-header></the-header>

    <router-view> </router-view>
    <the-footer></the-footer>
</template>

<style scoped></style>
