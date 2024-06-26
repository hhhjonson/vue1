import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:{
        name:'login'
      }
    },
    {
      path:'/login',
      name:'login',
      component:() => import("@/views/login/LoginView.vue"),
    }
  ]
})

export default router
