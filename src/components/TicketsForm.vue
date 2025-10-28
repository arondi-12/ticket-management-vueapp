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
            <RouterLink to="/dashboard" class="btn btn-secondary">Dashboard</RouterLink>
            <RouterLink to="/tickets" class="btn btn-secondary">All Tickets</RouterLink>
            <span class="dashboard-user">👤 {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <main v-if="isFetching" class="tickets-main">
      <div class="container">
        <div class="tickets-loading">
          <div class="spinner"></div>
          <p>Loading ticket...</p>
        </div>
      </div>
    </main>

    <!-- Main Form -->
    <main v-else class="tickets-main">
      <div class="container">
        <div class="form-page">
          <div class="form-container">
            <div class="form-header">
              <h1 class="form-title">
                {{ isEditMode ? '✏️ Edit Ticket' : '➕ Create New Ticket' }}
              </h1>
              <p class="form-subtitle">
                {{ isEditMode
                  ? 'Update the ticket information below'
                  : 'Fill in the details to create a new support ticket' }}
              </p>
            </div>

            <form class="ticket-form" @submit.prevent="handleSubmit">
              <div class="form-row">
                <div class="form-group form-group-full">
                  <label for="title" class="form-label">
                    Title <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="form-input"
                    :class="{ 'form-input-error': errors.title }"
                    placeholder="Enter a descriptive title for the ticket"
                    v-model="formData.title"
                    :disabled="isLoading"
                    maxlength="200"
                  />
                  <span v-if="errors.title" class="form-error">{{ errors.title }}</span>
                  <span class="form-hint">{{ formData.title.length }}/200 characters</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group form-group-full">
                  <label for="description" class="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    class="form-textarea"
                    :class="{ 'form-input-error': errors.description }"
                    placeholder="Provide a detailed description of the issue or request"
                    v-model="formData.description"
                    :disabled="isLoading"
                    rows="6"
                    maxlength="1000"
                  ></textarea>
                  <span v-if="errors.description" class="form-error">{{ errors.description }}</span>
                  <span class="form-hint">{{ formData.description.length }}/1000 characters</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="status" class="form-label">
                    Status <span class="required">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    class="form-select"
                    :class="{ 'form-input-error': errors.status }"
                    v-model="formData.status"
                    :disabled="isLoading"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <span v-if="errors.status" class="form-error">{{ errors.status }}</span>
                </div>

                <div class="form-group">
                  <label for="priority" class="form-label">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    class="form-select"
                    v-model="formData.priority"
                    :disabled="isLoading"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div class="form-actions">
                <RouterLink to="/tickets" class="btn btn-secondary">Cancel</RouterLink>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{
                    isLoading
                      ? (isEditMode ? 'Updating...' : 'Creating...')
                      : (isEditMode ? 'Update Ticket' : 'Create Ticket')
                  }}
                </button>
              </div>
            </form>
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
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { getCurrentUser, logout } from "../services/authServices";
import {
  createTicket,
  updateTicket,
  getTicketById,
} from "../services/ticketServices";

const props = defineProps({
  showToast: Function,
});

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const isEditMode = computed(() => !!id);

const user = ref(null);
const formData = ref({
  title: "",
  description: "",
  status: "open",
  priority: "medium",
});
const errors = ref({});
const isLoading = ref(false);
const isFetching = ref(isEditMode.value);

onMounted(() => {
  user.value = getCurrentUser();
  if (isEditMode.value) {
    loadTicket();
  }
});

async function loadTicket() {
  try {
    const response = await getTicketById(id);
    formData.value = {
      title: response.ticket.title,
      description: response.ticket.description,
      status: response.ticket.status,
      priority: response.ticket.priority,
    };
  } catch (error) {
    props.showToast?.(error.message, "error");
    router.push("/tickets");
  } finally {
    isFetching.value = false;
  }
}

function validateForm() {
  const newErrors = {};

  if (!formData.value.title || formData.value.title.trim() === "") {
    newErrors.title = "Title is required";
  } else if (formData.value.title.length > 200) {
    newErrors.title = "Title must be less than 200 characters";
  }

  if (!formData.value.status) {
    newErrors.status = "Status is required";
  } else if (!["open", "in_progress", "closed"].includes(formData.value.status)) {
    newErrors.status = "Status must be one of: open, in_progress, closed";
  }

  if (formData.value.description && formData.value.description.length > 1000) {
    newErrors.description = "Description must be less than 1000 characters";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
}

async function handleSubmit() {
  if (!validateForm()) {
    props.showToast?.("Please fix the errors in the form", "error");
    return;
  }

  isLoading.value = true;

  try {
    if (isEditMode.value) {
      const response = await updateTicket(id, formData.value);
      props.showToast?.(response.message, "success");
    } else {
      const response = await createTicket({
        ...formData.value,
        createdBy: user.value?.email || "unknown",
      });
      props.showToast?.(response.message, "success");
    }
    router.push("/tickets");
  } catch (error) {
    props.showToast?.(error.message, "error");
  } finally {
    isLoading.value = false;
  }
}

function handleLogout() {
  logout();
  props.showToast?.("You have been logged out successfully.", "success");
  router.push("/");
}
</script>

