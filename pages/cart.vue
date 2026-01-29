<template>
  <div class="container-custom py-8">
    <h1 class="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Browse our collection and add items to your cart</p>
      <NuxtLink to="/products" class="btn btn-primary px-8 py-3">
        Continue Shopping
      </NuxtLink>
    </div>

    <!-- Cart Items -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Items List -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.id" class="bg-white rounded-lg shadow p-4 flex gap-4">
          <!-- Product Image -->
          <NuxtLink :to="`/products/${item.slug}`" class="flex-shrink-0">
            <div class="w-24 h-24 bg-gray-200 rounded overflow-hidden">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>
          </NuxtLink>

          <!-- Product Details -->
          <div class="flex-grow">
            <NuxtLink :to="`/products/${item.slug}`" class="font-serif font-bold text-lg hover:text-primary-600 mb-1 block">
              {{ item.name }}
            </NuxtLink>
            <p class="text-primary-600 font-bold text-xl">₱{{ formatPrice(item.price) }}</p>
          </div>

          <!-- Remove Button -->
          <button 
            @click="removeItem(item.id)"
            class="flex-shrink-0 text-red-600 hover:text-red-700 p-2"
            title="Remove from cart"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6 sticky top-24">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          
          <div class="space-y-3 mb-4 pb-4 border-b">
            <div class="flex justify-between">
              <span class="text-gray-600">Items ({{ cartStore.itemCount }})</span>
              <span class="font-semibold">₱{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="text-sm text-gray-500">Calculated at checkout</span>
            </div>
          </div>

          <div class="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span class="text-primary-600">₱{{ formatPrice(cartStore.total) }}</span>
          </div>

          <NuxtLink to="/checkout" class="btn btn-primary w-full py-3 text-center block">
            Proceed to Checkout
          </NuxtLink>

          <NuxtLink to="/products" class="btn btn-outline w-full py-3 text-center block mt-3">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH').format(price)
}

const removeItem = (itemId: string) => {
  if (confirm('Remove this item from cart?')) {
    cartStore.removeItem(itemId)
  }
}

// Load cart from localStorage on mount
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

useHead({
  title: 'Shopping Cart | Powell\'s Antique Shop'
})
</script>
