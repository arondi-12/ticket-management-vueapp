<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <RouterLink to="/" class="auth-logo">
            <span class="logo-icon">🎫</span>
            <span class="logo-text">TicketFlow</span>
          </RouterLink>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              :class="{ 'form-input-error': errors.email }"
              placeholder="Enter your email"
              :disabled="isLoading"
            />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              class="form-input"
              :class="{ 'form-input-error': errors.password }"
              placeholder="Enter your password"
              :disabled="isLoading"
            />
            <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-block"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="auth-footer-text">
            Don't have an account?
            <RouterLink to="/signup" class="auth-link">Sign up</RouterLink>
          </p>
        </div>

        <div class="auth-demo">
          <p class="auth-demo-title">Demo Credentials:</p>
          <p class="auth-demo-text">Email: <strong>admin@ticketflow.com</strong></p>
          <p class="auth-demo-text">Password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authServices' 

const router = useRouter()
// const formData = ref({ email: '', password: '' })
// const isLoading = ref(false)

// props
const props = defineProps({
  showToast: {
    type: Function,
    required: true
  }
})

// reactive state
const formData = reactive({
  email: '',
  password: ''
})
const errors = reactive({})
const isLoading = ref(false)

const validateForm = () => {
  errors.email = ''
  errors.password = ''

  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return !errors.email && !errors.password
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    await login(formData.email, formData.password)
    props.showToast('Login successful! Welcome back.', 'success')
    router.push('/dashboard')
  } catch (error) {
    props.showToast(error.message || 'Login failed', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

