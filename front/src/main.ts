import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueMapboxTs from "vue-mapbox-ts";


createApp(App).mount('#app')


const app = createApp(App);

app.use(VueMapboxTs)