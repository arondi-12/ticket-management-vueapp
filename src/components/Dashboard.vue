<template>
  <div class="dashboard-page">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="dashboard-nav">
          <router-link to="/" class="dashboard-logo">
            <span class="logo-icon">🎫</span>
            <span class="logo-text">TicketFlow</span>
          </router-link>

          <div class="dashboard-nav-right">
            <span class="dashboard-user">👤 {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
      <div class="container">
        <!-- Welcome Section -->
        <div class="dashboard-welcome">
          <h1 class="dashboard-title">Welcome back, {{ user?.name }}! 👋</h1>
          <p class="dashboard-subtitle">
            Here's an overview of your ticket management system
          </p>
        </div>

        <!-- Statistics Grid -->
        <div v-if="isLoading" class="dashboard-loading">
          <div class="spinner"></div>
          <p>Loading statistics...</p>
        </div>

        <template v-else>
          <div class="stats-grid">
            <div class="stat-card stat-card-primary">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <h3 class="stat-number">{{ stats.total }}</h3>
                <p class="stat-label">Total Tickets</p>
              </div>
            </div>

            <div class="stat-card stat-card-success">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <h3 class="stat-number">{{ stats.open }}</h3>
                <p class="stat-label">Open Tickets</p>
              </div>
            </div>

            <div class="stat-card stat-card-warning">
              <div class="stat-icon">⏳</div>
              <div class="stat-content">
                <h3 class="stat-number">{{ stats.inProgress }}</h3>
                <p class="stat-label">In Progress</p>
              </div>
            </div>

            <div class="stat-card stat-card-info">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <h3 class="stat-number">{{ stats.closed }}</h3>
                <p class="stat-label">Resolved Tickets</p>
              </div>
            </div>
          </div>

          <!-- Priority Breakdown -->
          <div class="dashboard-section">
            <h2 class="section-title">Priority Breakdown</h2>
            <div class="priority-grid">
              <div class="priority-card priority-high">
                <div class="priority-icon">🔴</div>
                <div class="priority-content">
                  <h3 class="priority-number">{{ stats.highPriority }}</h3>
                  <p class="priority-label">High Priority</p>
                </div>
              </div>

              <div class="priority-card priority-medium">
                <div class="priority-icon">🟡</div>
                <div class="priority-content">
                  <h3 class="priority-number">{{ stats.mediumPriority }}</h3>
                  <p class="priority-label">Medium Priority</p>
                </div>
              </div>

              <div class="priority-card priority-low">
                <div class="priority-icon">🟢</div>
                <div class="priority-content">
                  <h3 class="priority-number">{{ stats.lowPriority }}</h3>
                  <p class="priority-label">Low Priority</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="dashboard-section">
            <h2 class="section-title">Quick Actions</h2>
            <div class="actions-grid">
              <router-link to="/tickets" class="action-card">
                <div class="action-icon">🎫</div>
                <h3 class="action-title">View All Tickets</h3>
                <p class="action-description">
                  Browse and manage all your support tickets
                </p>
              </router-link>

              <router-link to="/tickets/new" class="action-card">
                <div class="action-icon">➕</div>
                <h3 class="action-title">Create New Ticket</h3>
                <p class="action-description">
                  Submit a new support ticket for your issue
                </p>
              </router-link>

              <div class="action-card action-card-disabled">
                <div class="action-icon">📈</div>
                <h3 class="action-title">Analytics</h3>
                <p class="action-description">
                  View detailed reports and insights (Coming Soon)
                </p>
              </div>

              <div class="action-card action-card-disabled">
                <div class="action-icon">⚙️</div>
                <h3 class="action-title">Settings</h3>
                <p class="action-description">
                  Manage your account and preferences (Coming Soon)
                </p>
              </div>
            </div>
          </div>
        </template>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, logout } from '../services/authServices.js'
import { getTicketStats } from '../services/ticketServices.js'

const props = defineProps({
  showToast: Function
})

const router = useRouter()
const user = ref(null)
const isLoading = ref(true)

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
  highPriority: 0,
  mediumPriority: 0,
  lowPriority: 0
})

const loadStats = async () => {
  try {
    const response = await getTicketStats()
    stats.value = response.stats
  } catch (error) {
    console.error('Error loading stats:', error)
    props.showToast('Failed to load statistics. Please refresh the page.', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  logout()
  user.value = null
  props.showToast('You have been logged out successfully.', 'success')
  router.replace('/')
}

onMounted(() => {
  user.value = getCurrentUser()
  loadStats()
})
</script>


