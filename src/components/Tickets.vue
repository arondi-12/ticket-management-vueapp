<template>
  <div class="tickets-page">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="dashboard-nav">
          <RouterLink to="/" class="dashboard-logo">
            <span class="logo-icon">🎫</span>
            <span class="logo-text">TicketFlow</span>
          </RouterLink>
          <div class="dashboard-nav-right">
            <RouterLink to="/dashboard" class="btn btn-secondary">
              Dashboard
            </RouterLink>
            <span class="dashboard-user">👤 {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="tickets-main">
      <div class="container">
        <!-- Page Header -->
        <div class="tickets-header">
          <div>
            <h1 class="page-title">Ticket Management</h1>
            <p class="page-subtitle">
              Create, view, edit, and manage all your support tickets
            </p>
          </div>
          <RouterLink to="/tickets/new" class="btn btn-primary">➕ Create New Ticket</RouterLink>
        </div>

        <!-- Filters and Search -->
        <div class="tickets-filters">
          <div class="filter-buttons">
            <button
              class="filter-btn"
              :class="{ 'filter-btn-active': filter === 'all' }"
              @click="filter = 'all'"
            >
              All ({{ tickets.length }})
            </button>
            <button
              class="filter-btn"
              :class="{ 'filter-btn-active': filter === 'open' }"
              @click="filter = 'open'"
            >
              Open ({{ tickets.filter(t => t.status === 'open').length }})
            </button>
            <button
              class="filter-btn"
              :class="{ 'filter-btn-active': filter === 'in_progress' }"
              @click="filter = 'in_progress'"
            >
              In Progress ({{ tickets.filter(t => t.status === 'in_progress').length }})
            </button>
            <button
              class="filter-btn"
              :class="{ 'filter-btn-active': filter === 'closed' }"
              @click="filter = 'closed'"
            >
              Closed ({{ tickets.filter(t => t.status === 'closed').length }})
            </button>
          </div>

          <div class="search-box">
            <input
              v-model="searchTerm"
              type="text"
              class="search-input"
              placeholder="Search tickets..."
            />
          </div>
        </div>

        <!-- Tickets List -->
        <div v-if="isLoading" class="tickets-loading">
          <div class="spinner"></div>
          <p>Loading tickets...</p>
        </div>

        <div v-else-if="filteredTickets.length === 0" class="tickets-empty">
          <div class="empty-icon">📭</div>
          <h3>No tickets found</h3>
          <p>
            {{
              searchTerm || filter !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Create your first ticket to get started'
            }}
          </p>
          <RouterLink
            v-if="!searchTerm && filter === 'all'"
            to="/tickets/new"
            class="btn btn-primary"
          >
            Create New Ticket
          </RouterLink>
        </div>

        <div v-else class="tickets-grid">
          <div v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-card">
            <div class="ticket-header">
              <div class="ticket-badges">
                <span :class="getStatusBadgeClass(ticket.status)">
                  {{ ticket.status.replace('_', ' ') }}
                </span>
                <span :class="getPriorityBadgeClass(ticket.priority)">
                  {{ ticket.priority }}
                </span>
              </div>
              <div class="ticket-actions">
                <RouterLink
                  :to="`/tickets/edit/${ticket.id}`"
                  class="ticket-action-btn"
                  title="Edit ticket"
                >
                  ✏️
                </RouterLink>
                <button
                  @click="deleteConfirm = ticket.id"
                  class="ticket-action-btn ticket-delete-btn"
                  title="Delete ticket"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div class="ticket-body">
              <h3 class="ticket-title">{{ ticket.title }}</h3>
              <p class="ticket-description">
                {{ ticket.description || 'No description provided' }}
              </p>
            </div>

            <div class="ticket-footer">
              <span class="ticket-date">📅 {{ formatDate(ticket.createdAt) }}</span>
              <span class="ticket-author">👤 {{ ticket.createdBy }}</span>
            </div>

            <!-- Delete Confirmation Modal -->
            <div
              v-if="deleteConfirm === ticket.id"
              class="modal-overlay"
              @click="deleteConfirm = null"
            >
              <div class="modal" @click.stop>
                <h3 class="modal-title">Delete Ticket</h3>
                <p class="modal-text">
                  Are you sure you want to delete this ticket? This action cannot be undone.
                </p>
                <div class="modal-actions">
                  <button @click="deleteConfirm = null" class="btn btn-secondary">
                    Cancel
                  </button>
                  <button @click="handleDelete(ticket.id)" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="dashboard-footer">
      <div class="container">
        <p>© 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, logout } from "../services/authServices";
import { getAllTickets, deleteTicket } from "../services/ticketServices";

const props = defineProps({
  showToast: Function
});

const router = useRouter();
const user = ref(null);
const tickets = ref([]);
const filteredTickets = ref([]);
const isLoading = ref(true);
const filter = ref("all");
const searchTerm = ref("");
const deleteConfirm = ref(null);

onMounted(() => {
  user.value = getCurrentUser();
  loadTickets();
});

watch([tickets, filter, searchTerm], applyFilters, { deep: true });

async function loadTickets() {
  isLoading.value = true;
  try {
    const response = await getAllTickets();
    tickets.value = response.tickets;
  } catch (error) {
    console.error("Error loading tickets:", error);
    props.showToast?.("Failed to load tickets. Please try again.", "error");
  } finally {
    isLoading.value = false;
  }
}

function applyFilters() {
  let filtered = [...tickets.value];

  if (filter.value !== "all") {
    filtered = filtered.filter(t => t.status === filter.value);
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
    );
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  filteredTickets.value = filtered;
}

async function handleDelete(id) {
  try {
    await deleteTicket(id);
    props.showToast?.("Ticket deleted successfully!", "success");
    await loadTickets();
    deleteConfirm.value = null;
  } catch (error) {
    props.showToast?.(error.message, "error");
  }
}

function handleLogout() {
  logout();
  props.showToast?.("You have been logged out successfully.", "success");
  router.push("/");
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "open":
      return "status-badge status-open";
    case "in_progress":
      return "status-badge status-progress";
    case "closed":
      return "status-badge status-closed";
    default:
      return "status-badge";
  }
}

function getPriorityBadgeClass(priority) {
  switch (priority) {
    case "high":
      return "priority-badge priority-high";
    case "medium":
      return "priority-badge priority-medium";
    case "low":
      return "priority-badge priority-low";
    default:
      return "priority-badge";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
</script>

