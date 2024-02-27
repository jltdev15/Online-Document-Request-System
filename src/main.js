import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
const app = createApp(App);
app.use(Toast);
app.component("EasyDataTable", Vue3EasyDataTable);
app.use(createPinia());
app.use(router);

app.mount("#app");
