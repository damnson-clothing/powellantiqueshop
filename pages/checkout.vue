<template>
  <div class="container-custom py-8">
    <h1 class="text-3xl font-serif font-bold mb-8">Checkout</h1>

    <!-- Redirect if cart is empty -->
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <p class="text-gray-600 mb-4">Your cart is empty</p>
      <NuxtLink to="/products" class="btn btn-primary">
        Browse Products
      </NuxtLink>
    </div>

    <!-- Checkout Form -->
    <form v-else @submit.prevent="submitOrder" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Customer Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Contact Information</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.customerName" 
                type="text" 
                required 
                class="input"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.customerEmail" 
                type="email" 
                required 
                class="input"
                placeholder="juan@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.customerPhone" 
                type="tel" 
                required 
                class="input"
                placeholder="+63 912 345 6789"
              />
            </div>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Shipping Address</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Complete Address <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="form.shippingAddress" 
              required 
              rows="4"
              class="input"
              placeholder="Street address, Barangay, City, Province, Postal Code"
            ></textarea>
          </div>
        </div>

        <!-- Order Notes -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Order Notes (Optional)</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Special instructions or delivery notes
            </label>
            <textarea 
              v-model="form.customerNotes" 
              rows="3"
              class="input"
              placeholder="E.g., Call before delivery, Leave at gate, etc."
            ></textarea>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6 sticky top-24">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          
          <!-- Cart Items -->
          <div class="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
            <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3">
              <div class="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow min-w-0">
                <p class="font-semibold text-sm truncate">{{ item.name }}</p>
                <p class="text-primary-600 font-bold">₱{{ formatPrice(item.price) }}</p>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="space-y-3 mb-4 pb-4 border-b">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold">₱{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="text-sm text-gray-500">To be arranged</span>
            </div>
          </div>

          <div class="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span class="text-primary-600">₱{{ formatPrice(cartStore.total) }}</span>
          </div>

          <!-- Payment Notice -->
          <div class="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4 text-sm">
            <p class="text-yellow-800">
              <strong>Payment:</strong> We will contact you to arrange payment and shipping details after you place your order.
            </p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="submitting"
            class="btn btn-primary w-full py-3"
          >
            <span v-if="submitting">Processing Order...</span>
            <span v-else>Place Order</span>
          </button>

          <NuxtLink to="/cart" class="btn btn-outline w-full py-3 mt-3 text-center block">
            Back to Cart
          </NuxtLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  shippingAddress: '',
  customerNotes: ''
})

const submitting = ref(false)
const errorMessage = ref('')

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH').format(price)
}

const submitOrder = async () => {
  submitting.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await useFetch('/api/orders', {
      method: 'POST',
      body: {
        customerName: form.value.customerName,
        customerEmail: form.value.customerEmail,
        customerPhone: form.value.customerPhone,
        shippingAddress: form.value.shippingAddress,
        customerNotes: form.value.customerNotes,
        items: cartStore.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    })

    if (error.value) {
      errorMessage.value = error.value.data?.message || 'Failed to place order. Please try again.'
      submitting.value = false
      return
    }

    if (data.value && data.value.success) {
      // Clear cart
      cartStore.clearCart()
      
      // Redirect to confirmation page
      await navigateTo(`/order-confirmation/${data.value.order.orderNumber}`)
    }
  } catch (err: any) {
    console.error('Order error:', err)
    errorMessage.value = 'An error occurred. Please try again.'
    submitting.value = false
  }
}

// Load cart on mount
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

useHead({
  title: 'Checkout | Powell\'s Antique Shop'
})
</script>
