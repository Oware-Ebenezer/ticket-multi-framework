<template>
  <article
    class="ticket-card"
  >
    <section>
      <h3 class="title">{{ ticket.title }}</h3>
      <p class="description">{{ ticket.description }}</p>
    </section>

    <section class="footer">
      <span
        class="status"
        :class="statusClass(ticket.status)"
      >
        {{ ticket.status.replace('_', ' ') }}
      </span>

      <section class="actions">
        <button
          @click="$emit('edit', ticket)"
          aria-label="Edit Ticket"
        >
          Edit
        </button>
        <button
          @click="confirmDelete"
          aria-label="Delete Ticket"
        >
          Delete
        </button>
      </section>
    </section>
  </article>
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function statusClass(status) {
  if (status === "open") return "status-open";
  if (status === "in_progress") return "status-progress";
  return "status-closed";
}

function confirmDelete() {
  if (confirm("Are you sure you want to delete this ticket?")) {
    emit("delete", props.ticket.id);
  }
}
</script>

<style scoped>
.ticket-card {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  padding: 1.25rem;
  color: #111827;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ticket-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.description {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

.footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.status-open {
  background-color: #dcfce7;
  color: #22c55e;
}

.status-progress {
  background-color: #fef3c7;
  color: #f59e0b;
}

.status-closed {
  background-color: #f3f4f6;
  color: #9ca3af;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: none;
  cursor: pointer;
  transition: background 0.2s;
}

.actions button:hover {
  background-color: #f3f4f6;
}
</style>
