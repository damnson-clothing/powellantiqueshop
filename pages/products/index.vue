<template>
  <div class="container-custom py-12">
    <h1 class="text-4xl font-serif font-bold mb-8">Our Products</h1>

    <!-- Filters -->
    <div class="mb-8 bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search products..." 
            class="input"
            @input="debouncedSearch"
          />
        </div>

        <!-- Category Filter -->
        <div>
          <select v-model="selectedCategory" class="input" @change="filterProducts">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.slug">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Condition Filter -->
        <div>
          <select v-model="selectedCondition" class="input" @change="filterProducts">
            <option value="">All Conditions</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Vintage">Vintage</option>
          </select>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input 
            v-model.number="minPrice" 
            type="number" 
            placeholder="Min" 
            class="input"
            @input="filterProducts"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input 
            v-model.number="maxPrice" 
            type="number" 
            placeholder="Max" 
            class="input"
            @input="filterProducts"
          />
        </div>
      </div>

      <button @click="clearFilters" class="mt-4 text-sm text-primary-600 hover:text-primary-700">
        Clear all filters
      </button>
    </div>

    <!-- Products Grid -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading products...</p>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500">No products found.</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="card hover:shadow-xl transition">
          <NuxtLink :to="`/products/${product.slug}`">
            <div class="aspect-square bg-gray-200 overflow-hidden">
              <img 
                v-if="product.images && product.images[0]" 
                :src="product.images[0]" 
                :alt="product.name"
                class="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div class="p-4">
              <div class="text-xs text-primary-600 mb-1">{{ product.category.name }}</div>
              <h3 class="font-serif font-bold text-lg mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-primary-600 font-bold text-xl">₱{{ formatPrice(product.price) }}</span>
                <span class="text-sm text-gray-500">{{ product.condition }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="mt-8 flex justify-center items-center space-x-2">
        <button 
          @click="goToPage(pagination.page - 1)" 
          :disabled="pagination.page === 1"
          class="btn btn-outline disabled:opacity-50"
        >
          Previous
        </button>
        
        <span class="text-gray-600">
          Page {{ pagination.page }} of {{ pagination.totalPages }}
        </span>
        
        <button 
          @click="goToPage(pagination.page + 1)" 
          :disabled="pagination.page === pagination.totalPages"
          class="btn btn-outline disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = ref<any[]>([])
const categories = ref<any[]>([])
const loading = ref(true)
const pagination = ref({ page: 1, limit: 12, total: 0, totalPages: 0 })

// Filters
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedCondition = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('en-PH').format(Number(price))
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const params: any = {
      page: pagination.value.page,
      limit: pagination.value.limit
    }

    if (searchQuery.value) params.search = searchQuery.value
    if (selectedCategory.value) params.category = selectedCategory.value
    if (selectedCondition.value) params.condition = selectedCondition.value
    if (minPrice.value) params.minPrice = minPrice.value
    if (maxPrice.value) params.maxPrice = maxPrice.value

    const { data } = await useFetch('/api/products', { params })
    products.value = data.value?.products || []
    pagination.value = data.value?.pagination || pagination.value
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const { data } = await useFetch('/api/categories')
    categories.value = data.value || []
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

let debounceTimer: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    pagination.value.page = 1
    fetchProducts()
  }, 500)
}

const filterProducts = () => {
  pagination.value.page = 1
  fetchProducts()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedCondition.value = ''
  minPrice.value = null
  maxPrice.value = null
  pagination.value.page = 1
  fetchProducts()
}

const goToPage = (page: number) => {
  pagination.value.page = page
  fetchProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>
