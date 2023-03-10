import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeDevice.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:id', name: 'home', component: Home }
  ]
})

export default router
