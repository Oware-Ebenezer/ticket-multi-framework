<template>
  <main class="tickets-container">
    <div class="header">
      <h2>Ticket Management</h2>
    </div>

    <section class="form-section">
      <h3>{{ editing ? "Edit Ticket" : "Create Ticket" }}</h3>
      <TicketForm
        :initial="editing || {}"
        @submit="handleSubmit"
        @cancel="() => (editing = null)"
      />
    </section>

    <section class="list-section">
      <h3>All Tickets</h3>

      <div v-if="tickets.length === 0" class="empty-state">
        No tickets yet. Create one above
      </div>

      <div v-else class="ticket-grid">
        <TicketCard
          v-for="t in tickets"
          :key="t.id"
          :ticket="t"
          @edit="() => (editing = t)"
          @delete="handleDelete"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ticketsServices } from "../services/ticketServices";
import { toast } from "vue3-toastify";
import TicketForm from "../components/TicketForm.vue";
import TicketCard from "../components/TicketCard.vue";

const tickets = ref([]);
const editing = ref(null);

onMounted(() => {
  try {
    tickets.value = ticketsServices.list();
  } catch {
    toast.error("Failed to load tickets. Please retry.");
  }
});

const handleCreate = (payload) => {
  try {
    const created = ticketsServices.create(payload);
    tickets.value = [created, ...tickets.value];
    toast.success("Ticket created successfully");
  } catch (err) {
    if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
    else toast.error(err.message || "Failed to create ticket");
  }
};

const handleUpdate = (id, patch) => {
  try {
    const updated = ticketsServices.update(id, patch);
    tickets.value = tickets.value.map((x) =>
      x.id === updated.id ? updated : x
    );
    editing.value = null;
    toast.success("Ticket updated");
  } catch (err) {
    if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
    else toast.error(err.message || "Failed to update ticket");
  }
};

const handleDelete = (id) => {
  try {
    ticketsServices.remove(id);
    tickets.value = tickets.value.filter((x) => x.id !== id);
    toast.success("Ticket deleted");
  } catch (err) {
    toast.error(err.message || "Failed to delete ticket");
  }
};

const handleSubmit = (payload) => {
  if (editing.value) handleUpdate(editing.value.id, payload);
  else handleCreate(payload);
};
</script>

<style scoped>
.tickets-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #000000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  font-size: 1.75rem;
  font-weight: bold;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.list-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.empty-state {
  background: rgba(11, 18, 32, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.25rem;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}

.empty-state:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
}
</style>
