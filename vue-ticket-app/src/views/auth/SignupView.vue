<template>
  <AuthLayout title="Create an Account">
    <form class="signup-form" @submit.prevent="handleSubmit">
      <input
        type="text"
        name="name"
        placeholder="Mr. John Smith"
        v-model="form.name"
        class="form-input"
      />

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

      <button type="submit" class="btn-primary">
        Sign Up
      </button>
    </form>

    <p class="login-text">
      Already have an account?
      <RouterLink to="/auth/login" class="login-link">
        Login
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "@/main";
import { getUsers, saveUsers, setSession } from "@/utils/authUtils";
import AuthLayout from "./AuthLayout.vue";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

function handleSubmit() {
  const { name, email, password } = form;
  if (!name || !email || !password) {
    toast.error("All fields are required!");
    return;
  }

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    toast.error("User with this email already exists!");
    router.push("/auth/login");
    return;
  }

  const newUser = { name, email, password };
  saveUsers(newUser);
  setSession(newUser);
  toast.success("Signup successful!");
  router.push("/dashboard");
}
</script>

<style scoped>
/* Layout */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* equivalent to space-y-4 */
}

/* Input styles */
.form-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.4);
}

/* Button styles */
.btn-primary {
  width: 100%;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease-in-out;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

/* Login text and link */
.login-text {
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
  color: #444;
}

.login-link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
