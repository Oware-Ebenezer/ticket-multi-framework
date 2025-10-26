<template>
  <AuthLayout title="Login to Your Account">
    <form class="form-space" @submit="handleSubmit">
      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        v-model="form.email"
        class="form-input"
      />
      <input
        type="password"
        name="password"
        placeholder="*************"
        v-model="form.password"
        class="form-input"
      />
      <button type="submit" class="submit-button">
        Login
      </button>
    </form>
    <p class="signup-text">
      Don't have an account?
      <router-link to="/auth/signup" class="signup-link">
        Sign Up
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from '@/main';
import { getUsers, setSession } from '../../utils/authUtils';
import AuthLayout from './AuthLayout.vue';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = form.value;

  if (!email || !password) {
    toast.error('Please fill all the fields');
    return;
  }

  const users = getUsers();
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    toast.error('Invalid credentials');
    return;
  }

  setSession(foundUser);
  toast.success(`Login successful, Welcome back ${foundUser.name}`);
  router.push('/dashboard');
};
</script>

<style scoped>
.form-space {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem;
  outline: 0;
  transition: box-shadow 0.2s, border 0.2s;
}

.form-input:focus {
  box-shadow: 0 0 0 2px #60a5fa;
  border: 0;
}

.submit-button {
  width: 100%;
  background-color: #16a34a;
  color: white;
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #15803d;
}

.signup-text {
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.signup-link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>