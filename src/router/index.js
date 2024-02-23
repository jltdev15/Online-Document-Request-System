import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLogin from '@/views/AdminLogin.vue'
import StudentLogin from '@/views/StudentLogin.vue'
import StudentRegistration from '@/views/StudentRegistration.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path:'/admin_login',
      name:'adminlogin',
      component: AdminLogin
    },
    {
      path:'/student_login',
      name:'studentlogin',
      component: StudentLogin
    },
    {
      path:'/student_registration',
      name:'studentregister',
      component: StudentRegistration
    },
    {
      path:'/admin_dashboard',
      name:'admin-dashboard',
      component: AdminDashboard 
    }
  ]
})

export default router
