<template>
  <main class="dashboard-container">
    <section class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Okicket Dashboard</h1>
        <p class="dashboard-welcome">
          Welcome back,
          <span class="user-name">
            {{ session?.name || session?.email }}
          </span>
        </p>
      </div>
      <div class="header-actions">
        <router-link to="/tickets" class="manage-link">
          Manage Tickets
        </router-link>
        <LogoutButton />
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-card">
        <h4 class="stat-label">Total Tickets</h4>
        <p class="stat-value">{{ stats.total }}</p>
      </div>
      <div class="stat-card">
        <h4 class="stat-label">Open</h4>
        <p class="stat-value">{{ stats.open }}</p>
      </div>
      <div class="stat-card">
        <h4 class="stat-label">In Progress</h4>
        <p class="stat-value">{{ stats.in_progress }}</p>
      </div>
      <div class="stat-card">
        <h4 class="stat-label">Closed</h4>
        <p class="stat-value">{{ stats.closed }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSession } from '../utils/authUtils';
import { ticketsServices } from '../services/ticketServices';
import { toast } from '@/main';
import LogoutButton from '../components/LogoutButton.vue';

const stats = ref({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0,
});

const session = getSession();

onMounted(() => {
  try {
    const all = ticketsServices.list();
    const total = all.length;
    const open = all.filter((t) => t.status === 'open').length;
    const in_progress = all.filter((t) => t.status === 'in_progress').length;
    const closed = all.filter((t) => t.status === 'closed').length;
    stats.value = { total, open, in_progress, closed };
  } catch {
    toast.error('Failed to load tickets. Please retry.');
  }
});
</script>

<style scoped>
.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dashboard-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.dashboard-welcome {
  font-size: 0.875rem;
  color: #94a3b8;
}

.user-name {
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.manage-link {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s, border-color 0.2s;
}

.manage-link:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background-color: rgba(11, 18, 32, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.25rem;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
}

.stat-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: scale(1.02);
}

.stat-label {
  font-size: 0.875rem;
  color: #94a3b8;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>