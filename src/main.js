import {createApp} from 'vue'
import App from './App.vue'
import Home from "@/components/Home.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Rules from "@/components/Rules.vue";
import Tracks from "@/components/Tracks.vue";
import Rewards from "@/components/Rewards.vue";
import Standings from "@/components/Standings.vue";

const routes = [
  {path: '/', component: Home},
  {path: '/zasady', component: Rules},
  {path: '/tory', component: Tracks},
  {path: '/nagrody', component: Rewards},
  {path: '/klasyfikacja', component: Standings}

]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
