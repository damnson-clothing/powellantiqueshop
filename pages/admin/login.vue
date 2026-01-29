<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
          Powell's Admin Panel
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your store
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="input"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="input"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn btn-primary py-3 text-lg"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </div>

        <!-- Default Credentials Info (Remove in production) -->
        <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p class="text-xs text-yellow-800">
            <strong>Default credentials:</strong><br>
            Username: admin<br>
            Password: admin123
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // Use no layout for login page
})

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (error.value) {
      errorMessage.value = error.value.data?.message || 'Login failed. Please try again.'
      loading.value = false
      return
    }

    if (data.value && data.value.success) {
      // Cookie is automatically set by the server
      // Store admin info in localStorage for display purposes only
      if (data.value.admin) {
        localStorage.setItem('admin_user', JSON.stringify(data.value.admin))
      }

      // Redirect to admin dashboard
      await navigateTo('/admin')
    } else {
      errorMessage.value = 'Invalid credentials'
    }
  } catch (err: any) {
    console.error('Login error:', err)
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
