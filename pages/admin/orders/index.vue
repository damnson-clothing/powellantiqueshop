<template>
  <NuxtLayout name="admin">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Orders</h1>
        <p class="mt-2 text-sm text-gray-700">Manage customer orders and fulfillment</p>
      </div>

      <!-- Status Filter Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="status in statusFilters"
            :key="status.value"
            @click="selectedStatus = status.value"
            :class="[
              selectedStatus === status.value
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ status.label }}
            <span
              v-if="getStatusCount(status.value) > 0"
              :class="[
                selectedStatus === status.value
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-900',
                'ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium inline-block'
              ]"
            >
              {{ getStatusCount(status.value) }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"></div>
        <p class="mt-4 text-gray-600">Loading orders...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {{ error }}
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Order #{{ order.orderNumber }}</h3>
                <p class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span
                  :class="[
                    'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusColor(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
                <NuxtLink
                  :to="`/admin/orders/${order.id}`"
                  class="text-primary-600 hover:text-primary-900 text-sm font-medium"
                >
                  View Details →
                </NuxtLink>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-500 mb-1">Customer</p>
                <p class="font-medium text-gray-900">{{ order.customerName }}</p>
                <p class="text-gray-600">{{ order.customerEmail }}</p>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Items</p>
                <p class="font-medium text-gray-900">{{ order.items.length }} item(s)</p>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Total</p>
                <p class="font-medium text-gray-900 text-lg">₱{{ Number(order.total).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredOrders.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ selectedStatus === 'ALL' ? 'No orders have been placed yet.' : `No ${selectedStatus.toLowerCase()} orders.` }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const orders = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedStatus = ref('ALL')

const statusFilters = [
  { label: 'All Orders', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Shipped', value: 'SHIPPED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' }
]

// Filtered orders based on status
const filteredOrders = computed(() => {
  if (selectedStatus.value === 'ALL') {
    return orders.value
  }
  return orders.value.filter(order => order.status === selectedStatus.value)
})

// Get count for each status
const getStatusCount = (status: string) => {
  if (status === 'ALL') {
    return orders.value.length
  }
  return orders.value.filter(order => order.status === status).length
}

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

// Fetch orders
const fetchOrders = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await $fetch<any[]>('/api/admin/orders')
    orders.value = data
  } catch (err: any) {
    error.value = err.message || 'Failed to load orders'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
