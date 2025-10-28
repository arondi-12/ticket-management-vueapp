<template>
  <div 
    v-if="isVisible" 
    :class="['toast', `toast-${type}`, { 'toast-exit': isExiting }]"
  >
    <div class="toast-icon">{{ icons[type] }}</div>
    <div class="toast-message">{{ message }}</div>
    <button class="toast-close" @click="closeManually">✕</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: 'success' },
  duration: { type: Number, default: 3000 },
  onClose: Function
})

const isVisible = ref(true)
const isExiting = ref(false)

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}

let exitTimer, closeTimer

onMounted(() => {
  exitTimer = setTimeout(() => (isExiting.value = true), props.duration - 300)
  closeTimer = setTimeout(() => {
    isVisible.value = false
    props.onClose?.()
  }, props.duration)
})

onBeforeUnmount(() => {
  clearTimeout(exitTimer)
  clearTimeout(closeTimer)
})

const closeManually = () => {
  isExiting.value = true
  setTimeout(() => {
    isVisible.value = false
    props.onClose?.()
  }, 300)
}
</script>
