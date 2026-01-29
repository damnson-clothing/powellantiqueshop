<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container-custom py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-serif font-bold text-primary-600">Powell's</span>
            <span class="text-sm text-gray-600 hidden sm:block">Antique Shop</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition">Home</NuxtLink>
            <NuxtLink to="/products" class="text-gray-700 hover:text-primary-600 transition">Products</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 transition">About</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-primary-600 transition">Contact</NuxtLink>
          </div>

          <!-- Cart & Mobile Menu -->
          <div class="flex items-center space-x-4">
            <!-- Cart Icon -->
            <NuxtLink to="/cart" class="relative">
              <svg class="w-6 h-6 text-gray-700 hover:text-primary-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ cartCount }}
              </span>
            </NuxtLink>

            <!-- Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-2">
          <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-primary-600">Home</NuxtLink>
          <NuxtLink to="/products" class="block py-2 text-gray-700 hover:text-primary-600">Products</NuxtLink>
          <NuxtLink to="/about" class="block py-2 text-gray-700 hover:text-primary-600">About</NuxtLink>
          <NuxtLink to="/contact" class="block py-2 text-gray-700 hover:text-primary-600">Contact</NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-secondary-800 text-white mt-16">
      <div class="container-custom py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About -->
          <div>
            <h3 class="text-xl font-serif font-bold mb-4">Powell's Antique Shop</h3>
            <p class="text-secondary-300 text-sm">
              Curating vintage bags and collectibles since 2010. Located in Baguio City, Philippines.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm text-secondary-300">
              <li><NuxtLink to="/products" class="hover:text-white transition">Shop</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-white transition">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white transition">Contact</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold mb-4">Contact Us</h4>
            <ul class="space-y-2 text-sm text-secondary-300">
              <li>Skyworld, Session Road, Baguio City</li>
              <li>Email: info@powellsantique.com</li>
              <li>Phone: +63 XXX XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-secondary-700 mt-8 pt-6 text-center text-sm text-secondary-400">
          <p>&copy; {{ new Date().getFullYear() }} Powell's Antique Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const mobileMenuOpen = ref(false)
const cartStore = useCartStore()

// Load cart on mount
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

// Cart count from store
const cartCount = computed(() => cartStore.itemCount)
</script>
