import { ref } from 'vue'

export function useToast() {
  const toasts = ref([])

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type, duration })
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const showSuccess = (msg, duration) => addToast(msg, 'success', duration)
  const showError = (msg, duration) => addToast(msg, 'error', duration)
  const showWarning = (msg, duration) => addToast(msg, 'warning', duration)
  const showInfo = (msg, duration) => addToast(msg, 'info', duration)

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
