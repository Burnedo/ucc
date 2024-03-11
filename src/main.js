import {createApp} from 'vue'
import App from './App.vue'
import Home from "@/components/Home.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Weather from "@/components/Weather.vue";

import Season1 from "@/components/Season1.vue";
import ComboRandomizer from "@/components/ComboRandomizer.vue";

const routes = [
  {path: '/', component: Home},
  {path: '/kombo', component: ComboRandomizer},
  {path: '/pogoda', component: Weather},
  {path: '/sezon-1', component: Season1}
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
