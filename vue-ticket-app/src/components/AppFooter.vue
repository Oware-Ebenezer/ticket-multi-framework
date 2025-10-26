<template>
  <footer class="site-footer">
    <article class="footer-content">
      &copy; {{ currentYear }} OKICKET. All rights reserved.
    </article>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  background: #022c22; /* emerald-950 */
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
  color: #e5e7eb; /* gray-200 */
  font-size: 0.875rem;
}
</style>
