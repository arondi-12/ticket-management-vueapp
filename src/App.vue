<template>
  <div class="app-container">
    <RouterView v-slot = "{ Component}">
      <component :is="Component" :showToast="showToast" />
    </RouterView>
    <ToastContainer :toasts="toasts" :removeToast="removeToast" />
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
// import { isAuthenticated } from './services/authService'
import ToastContainer from './components/ToastContainer.vue'
import { useToast } from './composables/useToast'

// Initialize toast composable
const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast()

// Universal toast trigger function (like showToast in React)
const showToast = (message, type = 'success') => {
  switch (type) {
    case 'success':
      showSuccess(message)
      break
    case 'error':
      showError(message)
      break
    case 'warning':
      showWarning(message)
      break
    case 'info':
      showInfo(message)
      break
    default:
      showSuccess(message)
  }
}
</script>
