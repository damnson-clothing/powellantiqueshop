<template>
  <NuxtLayout name="admin">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/admin/orders" class="text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← Back to Orders
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Order Details</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"></div>
        <p class="mt-4 text-gray-600">Loading order...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {{ error }}
      </div>

      <!-- Order Content -->
      <div v-else class="space-y-6">
        <!-- Order Header -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Order #{{ order.orderNumber }}</h2>
              <p class="text-sm text-gray-500 mt-1">Placed on {{ formatDate(order.createdAt) }}</p>
            </div>
            <span
              :class="[
                'px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full',
                getStatusColor(order.status)
              ]"
            >
              {{ order.status }}
            </span>
          </div>

          <!-- Update Status Form -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Update Order Status</label>
            <div class="flex items-center space-x-3">
              <select
                id="status"
                v-model="newStatus"
                class="block w-64 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <button
                @click="updateStatus"
                :disabled="updating || newStatus === order.status"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ updating ? 'Updating...' : 'Update Status' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">Name</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ order.customerName }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ order.customerEmail }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Phone</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ order.customerPhone || 'N/A' }}</dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Shipping Address</dt>
              <dd class="mt-1 text-sm text-gray-900 whitespace-pre-line">{{ order.shippingAddress }}</dd>
            </div>
            <div v-if="order.orderNotes" class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Order Notes</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ order.orderNotes }}</dd>
            </div>
          </dl>
        </div>

        <!-- Order Items -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0"
            >
              <img
                v-if="item.product?.images?.[0]"
                :src="item.product.images[0]"
                :alt="item.productName"
                class="h-16 w-16 rounded object-cover"
              />
              <div v-else class="h-16 w-16 rounded bg-gray-200 flex items-center justify-center">
                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">{{ item.productName }}</h4>
                <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">₱{{ Number(item.productPrice).toFixed(2) }}</p>
                <p class="text-xs text-gray-500">each</p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p class="text-2xl">₱{{ Number(order.total).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Order History -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Order History</h3>
          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="(history, idx) in order.statusHistory" :key="history.id">
                <div class="relative pb-8">
                  <span
                    v-if="idx !== order.statusHistory.length - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                  <div class="relative flex space-x-3">
                    <div>
                      <span
                        :class="[
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          getStatusColor(history.status).replace('text-', 'bg-').split(' ')[0]
                        ]"
                      >
                        <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p class="text-sm text-gray-900 font-medium">Status changed to {{ history.status }}</p>
                      </div>
                      <div class="whitespace-nowrap text-right text-sm text-gray-500">
                        <time>{{ formatDate(history.createdAt) }}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const orderId = route.params.id as string

const order = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const newStatus = ref('')
const updating = ref(false)

// Get status badge color
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

// Fetch order
const fetchOrder = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await $fetch<any>(`/api/admin/orders/${orderId}`)
    order.value = data
    newStatus.value = data.status
  } catch (err: any) {
    error.value = err.message || 'Failed to load order'
  } finally {
    loading.value = false
  }
}

// Update order status
const updateStatus = async () => {
  if (newStatus.value === order.value.status) {
    return
  }

  try {
    updating.value = true
    const updatedOrder = await $fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      body: { status: newStatus.value }
    })
    
    order.value = updatedOrder
    alert('Order status updated successfully!')
  } catch (err: any) {
    alert(err.message || 'Failed to update order status')
    newStatus.value = order.value.status
  } finally {
    updating.value = false
  }
}

onMounted(() => {
  fetchOrder()
})
</script>
