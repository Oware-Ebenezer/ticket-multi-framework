<template>
  <button @click="handleLogout" class="logout-button">
    Logout
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { clearSession } from '../utils/authUtils';
import { toast } from '@/main';

const router = useRouter();


const handleLogout = () => {
  clearSession();
  toast.success('You have logged out successfully');
  router.push('/');
};
</script>

<style scoped>
.logout-button {
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #dc2626;
}
</style>