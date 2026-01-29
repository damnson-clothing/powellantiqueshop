<template>
  <div class="container-custom py-8">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading order details...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12">
      <h2 class="text-2xl font-bold text-red-600 mb-4">Order Not Found</h2>
      <p class="text-gray-600 mb-6">We couldn't find this order.</p>
      <NuxtLink to="/products" class="btn btn-primary">
        Continue Shopping
      </NuxtLink>
    </div>

    <!-- Success -->
    <div v-else-if="order" class="max-w-3xl mx-auto">
      <!-- Success Icon -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-3xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p class="text-gray-600">Thank you for your order. We'll contact you soon to arrange payment and delivery.</p>
      </div>

      <!-- Order Details Card -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div class="border-b pb-4 mb-6">
          <h2 class="text-xl font-bold mb-2">Order Details</h2>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-600">Order Number</p>
              <p class="text-lg font-mono font-bold text-primary-600">{{ order.orderNumber }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Order Date</p>
              <p class="font-semibold">{{ formatDate(order.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
          <div>
            <h3 class="font-bold mb-2">Customer Information</h3>
            <p class="text-gray-700">{{ order.customerName }}</p>
            <p class="text-gray-600 text-sm">{{ order.customerEmail }}</p>
            <p class="text-gray-600 text-sm">{{ order.customerPhone }}</p>
          </div>
          <div>
            <h3 class="font-bold mb-2">Shipping Address</h3>
            <p class="text-gray-700 whitespace-pre-line">{{ order.shippingAddress }}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div class="mb-6">
          <h3 class="font-bold mb-4">Order Items</h3>
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.id" class="flex gap-4 pb-4 border-b last:border-0">
              <div class="w-20 h-20 bg-gray-200 rounded flex-shrink-0">
                <img 
                  v-if="item.product && item.product.images && item.product.images[0]" 
                  :src="item.product.images[0]" 
                  :alt="item.productName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-grow">
                <p class="font-semibold">{{ item.productName }}</p>
                <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-primary-600">₱{{ formatPrice(item.productPrice) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Total -->
        <div class="space-y-2">
          <div class="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span class="font-semibold">₱{{ formatPrice(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span class="text-sm text-gray-500">To be arranged</span>
          </div>
          <div class="flex justify-between text-xl font-bold border-t pt-2">
            <span>Total</span>
            <span class="text-primary-600">₱{{ formatPrice(order.total) }}</span>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.customerNotes" class="mt-6 pt-6 border-t">
          <h3 class="font-bold mb-2">Order Notes</h3>
          <p class="text-gray-700">{{ order.customerNotes }}</p>
        </div>
      </div>

      <!-- What's Next -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 class="font-bold text-blue-900 mb-3">What happens next?</h3>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>We'll contact you via email or phone to confirm your order</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>We'll arrange payment and shipping details with you</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Your items will be carefully packaged and shipped</span>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="bg-gray-50 rounded-lg p-6 text-center">
        <p class="text-gray-700 mb-4">Questions about your order?</p>
        <NuxtLink to="/contact" class="btn btn-outline">
          Contact Us
        </NuxtLink>
        <NuxtLink to="/products" class="btn btn-primary ml-4">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const orderNumber = route.params.orderNumber as string

const order = ref<any>(null)
const loading = ref(true)
const error = ref(false)

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('en-PH').format(Number(price))
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fetch order details
onMounted(async () => {
  try {
    const { data, error: fetchError } = await useFetch(`/api/orders/${orderNumber}`)
    
    if (fetchError.value || !data.value) {
      error.value = true
    } else {
      order.value = data.value
    }
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'Order Confirmation | Powell\'s Antique Shop'
})
</script>
