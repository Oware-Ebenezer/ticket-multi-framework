<template>
  <form class="ticket-form" @submit.prevent="handleSubmit">
    <section class="form-grid">
      <section>
        <label>Title</label>
        <input
          v-model="title"
          placeholder="Short descriptive title"
          aria-label="ticket title"
        />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
      </section>

      <section>
        <label>Status</label>
        <select v-model="status" aria-label="ticket status">
          <option v-for="stat in STATUS_OPTIONS" :key="stat" :value="stat">
            {{ stat.replace('_', ' ') }}
          </option>
        </select>
        <p v-if="errors.status" class="error">{{ errors.status }}</p>
      </section>

      <section>
        <label>Description (optional)</label>
        <textarea
          v-model="description"
          placeholder="More details (optional)"
          aria-label="ticket description"
        ></textarea>
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
      </section>

      <section class="buttons">
        <button type="submit" class="save">Save</button>
        <button
          v-if="onCancel"
          type="button"
          class="cancel"
          @click="onCancel"
        >
          Cancel
        </button>
      </section>
    </section>

    <button
      type="button"
      class="back-btn"
      :disabled="loading"
      @click="handleBackToDashboard"
    >
      <template v-if="loading">
        <svg
          class="spinner"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span>Returning...</span>
      </template>
      <template v-else>← Back to Dashboard</template>
    </button>
  </form>
</template>

<script setup>
import { ref, watch} from "vue";
import { useRouter } from "vue-router";
import { STATUS_OPTIONS, validateTicketPayload } from "../utils/validators";
import toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  onSubmit: { type: Function, required: true },
  onCancel: { type: Function },
});

const title = ref(props.initial.title ?? "");
const status = ref(props.initial.status ?? "open");
const description = ref(props.initial.desc ?? "");
const priority = ref(props.initial.priority ?? "normal");
const errors = ref({});
const loading = ref(false);
const router = useRouter();

function runValidate() {
  const errs = validateTicketPayload({
    title: title.value,
    status: status.value,
    description: description.value,
  });
  errors.value = errs;
  return errs;
}

watch([title, status, description], runValidate);

function handleSubmit() {
  const errs = runValidate();
  if (Object.keys(errs).length) return;

  props.onSubmit({
    title: title.value.trim(),
    status: status.value,
    description: description.value.trim(),
    priority: priority.value,
  });
}

function handleBackToDashboard() {
  loading.value = true;
  toast.success("Returning to Dashboard...");
  setTimeout(() => {
    router.push("/dashboard");
  }, 1000);
}
</script>

<style scoped>
.ticket-form {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  padding: 1.25rem;
  color: #111827;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.ticket-form:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

input,
select,
textarea {
  margin-top: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

textarea {
  min-height: 90px;
}

.error {
  color: #f87171;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

button.save {
  background: #06c122;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

button.cancel {
  background: #c11f06;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 0.5rem;
  background: #4f46e5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #4338ca;
}

.back-btn:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
