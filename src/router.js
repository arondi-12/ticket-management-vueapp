import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Signup from './components/SignUp.vue'
import Dashboard from './components/Dashboard.vue'
import Tickets from './components/Tickets.vue'
import TicketForm from './components/TicketsForm.vue'
import { isAuthenticated } from './services/authServices'

const routes = [
  { path: '/', component: LandingPage },
  { 
    path: '/login', 
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next('/dashboard')
      else next()
    }
  },
  { 
    path: '/signup', 
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next('/dashboard')
      else next()
    }
  },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/tickets', 
    component: Tickets, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/tickets/new', 
    component: TicketForm, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/tickets/edit/:id', 
    component: TicketForm, 
    meta: { requiresAuth: true } 
  },
  { path: '/register', redirect: '/signup' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protect routes globally
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router
