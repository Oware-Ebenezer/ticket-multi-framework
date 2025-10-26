<template>
  <section class="auth-layout">
    <div class="auth-card">
      <h2 class="auth-title">{{ title }}</h2>
      <slot></slot>
    </div>
    <footer class="auth-footer">
      &copy; {{ new Date().getFullYear() }} OKICKET. All rights reserved.
    </footer>
  </section>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e5e7eb; /* light gray */
  padding: 1rem;
}

.auth-card {
  max-width: 400px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #d1d5db;
  transition: box-shadow 0.3s ease;
}

.auth-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.auth-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-footer {
  margin-top: 2.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
