<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-secondary-800 text-white shadow-lg">
      <div class="container-custom py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold">Powell's Admin Panel</h1>
          <button @click="logout" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen">
        <nav class="p-4 space-y-2">
          <NuxtLink to="/admin" class="block px-4 py-2 rounded hover:bg-gray-100 transition">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/admin/products" class="block px-4 py-2 rounded hover:bg-gray-100 transition">
            Products
          </NuxtLink>
          <NuxtLink to="/admin/categories" class="block px-4 py-2 rounded hover:bg-gray-100 transition">
            Categories
          </NuxtLink>
          <NuxtLink to="/admin/orders" class="block px-4 py-2 rounded hover:bg-gray-100 transition">
            Orders
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const logout = async () => {
  try {
    // Call logout API to clear cookie
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    
    // Clear localStorage
    localStorage.removeItem('admin_user')
    
    // Redirect to login
    await navigateTo('/admin/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Still redirect even if API call fails
    await navigateTo('/admin/login')
  }
}
</script>
