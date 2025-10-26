import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/Landing-page.vue'
import Login from '../views/auth/LoginView.vue'
import Signup from '../views/auth/SignupView.vue'
import Dashboard from '../views/DashboardView.vue'
import Tickets from '../views/Tickets-View.vue'
import { getSession } from '../utils/authUtils'

// Simple route guard equivalent to ProtectedRoute in React
function requireAuth(to, from, next) {
  const session = getSession()
  if (!session) {
    // optionally show a toast if using one
    alert('Your session has expired, please log in again.')
    next('/auth/login')
  } else {
    next()
  }
}

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: Login },
  { path: '/auth/signup', name: 'Signup', component: Signup },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth, // protected route
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    beforeEnter: requireAuth, // protected route
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // catch-all redirect
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
