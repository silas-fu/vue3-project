import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: '/',
      redirect: '/todo'
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ],
})

export default router
