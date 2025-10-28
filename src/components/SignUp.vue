<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { signup } from '../services/authServices'

// Props (for showToast)
defineProps({
  showToast: Function
})

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const isLoading = ref(false)

// Validate form
const validateForm = () => {
  const newErrors = {}

  if (!formData.value.name) {
    newErrors.name = 'Name is required'
  } else if (formData.value.name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters'
  }

  if (!formData.value.email) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!formData.value.password) {
    newErrors.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)/.test(formData.value.password)) {
    newErrors.password = 'Password must contain uppercase, lowercase, or numbers'
  }

  if (!formData.value.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password'
  } else if (formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleChange = (e) => {
  const { name, value } = e.target
  formData.value[name] = value

  // Clear error for this field when user starts typing
  if (errors.value[name]) {
    delete errors.value[name]
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  isLoading.value = true

  try {
    await signup(formData.value.name, formData.value.email, formData.value.password)
    showToast?.('Account created successfully! Welcome to TicketFlow.', 'success')
    router.push('/dashboard')
  } catch (error) {
    showToast?.(error.message, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <RouterLink to="/" class="auth-logo">
            <span class="logo-icon">🎫</span>
            <span class="logo-text">TicketFlow</span>
          </RouterLink>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Sign up to get started with TicketFlow</p>
        </div>

        <form class="auth-form" @submit="handleSubmit">
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-input"
              :class="{ 'form-input-error': errors.name }"
              placeholder="Enter your full name"
              v-model="formData.name"
              :disabled="isLoading"
              @input="handleChange"
            />
            <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-input"
              :class="{ 'form-input-error': errors.email }"
              placeholder="Enter your email"
              v-model="formData.email"
              :disabled="isLoading"
              @input="handleChange"
            />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-input"
              :class="{ 'form-input-error': errors.password }"
              placeholder="Create a password"
              v-model="formData.password"
              :disabled="isLoading"
              @input="handleChange"
            />
            <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="form-input"
              :class="{ 'form-input-error': errors.confirmPassword }"
              placeholder="Confirm your password"
              v-model="formData.confirmPassword"
              :disabled="isLoading"
              @input="handleChange"
            />
            <span v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</span>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-block"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="auth-footer-text">
            Already have an account?
            <RouterLink to="/login" class="auth-link">Sign in</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
