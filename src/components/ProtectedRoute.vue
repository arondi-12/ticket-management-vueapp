<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../Services/authServices'

// Props: we’ll receive slot content (the children equivalent)
const router = useRouter()

if (!isAuthenticated()) {
  router.replace('/login')
}
</script>

<template>
  <!-- Renders child content only if authenticated -->
  <slot />
</template>
