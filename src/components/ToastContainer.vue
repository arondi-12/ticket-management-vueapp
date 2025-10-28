<template>
  <div class="toast-container">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :onClose="() => removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
import Toast from './Toast.vue'

const props = defineProps({
  toasts: Array,
  removeToast: Function
})
</script>
