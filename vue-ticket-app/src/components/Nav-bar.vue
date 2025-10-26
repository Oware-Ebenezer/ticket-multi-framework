<template>
  <nav class="navbar">
    <header class="nav-header">
      <h1 class="logo">OKICKET</h1>

      <!-- Desktop Links -->
      <section class="nav-links">
        <RouterLink to="/auth/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/auth/signup" class="nav-link highlight">Get Started</RouterLink>
      </section>

      <!-- Mobile Menu Button -->
      <button class="menu-btn" @click="isOpen = !isOpen">
        <span v-if="!isOpen">&#9776;</span> <!-- menu icon -->
        <span v-else>&#10005;</span>         <!-- X icon -->
      </button>
    </header>

    <!-- Mobile Dropdown -->
    <section v-if="isOpen" class="mobile-menu">
      <RouterLink
        to="/auth/login"
        class="mobile-link"
        @click="isOpen = false"
      >Login</RouterLink>

      <RouterLink
        to="/auth/signup"
        class="mobile-link highlight"
        @click="isOpen = false"
      >Get Started</RouterLink>
    </section>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style scoped>
/* ===== NAVBAR STRUCTURE ===== */
.navbar {
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}

.nav-header {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ===== LOGO ===== */
.logo {
  font-size: 1.6rem;
  font-weight: 700;
  color: #15803d;
  letter-spacing: 0.5px;
}

/* ===== DESKTOP NAV LINKS ===== */
.nav-links {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 1.5rem;
}

.nav-link {
  color: #1f2937;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: #15803d;
}

.nav-link.highlight {
  font-weight: 600;
}

/* ===== MOBILE MENU BUTTON ===== */
.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #374151;
  transition: color 0.3s ease;
}

.menu-btn:hover {
  color: #15803d;
}

/* ===== MOBILE MENU ===== */
.mobile-menu {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  gap: 0.75rem;
}

.mobile-link {
  color: #1f2937;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.mobile-link:hover {
  color: #15803d;
}

.mobile-link.highlight {
  font-weight: 600;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .menu-btn {
    display: block;
  }
}
</style>
