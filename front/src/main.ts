import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueMapboxTs from "vue-mapbox-ts";
import { createPinia } from 'pinia'


const app = createApp(App);
app.use(VueMapboxTs)
createApp(App).use(createPinia()).mount('#app');