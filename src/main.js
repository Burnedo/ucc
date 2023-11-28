import {createApp} from 'vue'
import App from './App.vue'
import Home from "@/components/Home.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Rules from "@/components/Rules.vue";
import Tracks from "@/components/Tracks.vue";
import Rewards from "@/components/Rewards.vue";
import Standings from "@/components/Standings.vue";
import Weather from "@/components/Weather.vue";
import Finale from "@/components/Finale.vue";
import FinaleStandings from "@/components/FinaleStandings.vue";


const routes = [
  {path: '/', component: Home},
  {path: '/zasady', component: Rules},
  {path: '/tory', component: Tracks},
  {path: '/nagrody', component: Rewards},
  {path: '/klasyfikacja', component: Standings},
  {path: '/pogoda', component: Weather},
  {path: '/final', component: Finale},
  {path: '/wyniki', component: FinaleStandings}
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
