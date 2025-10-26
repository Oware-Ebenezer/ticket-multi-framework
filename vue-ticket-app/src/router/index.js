import { createRouter, createWebHistory } from "vue-router";
import { getSession } from "../utils/authUtils.js";

// Import your views
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/auth/login", name: "Login", component: LoginView },
  { path: "/auth/signup", name: "Signup", component: SignupView },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }, // <-- protected route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Global Auth Guard (acts like your ProtectedRoute)
router.beforeEach((to, from, next) => {
  const session = getSession();

  if (to.meta.requiresAuth && !session) {
    alert("Your session has expired. Please log in again.");
    return next("/auth/login");
  }

  next();
});

export default router;
