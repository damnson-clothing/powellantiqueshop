<template>
  <div class="container-custom py-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <h2 class="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
      <p class="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/products" class="btn btn-primary">
        Back to Products
      </NuxtLink>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-primary-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-primary-600">Products</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink :to="`/products?category=${product.category.slug}`" class="hover:text-primary-600">
          {{ product.category.name }}
        </NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Image Gallery -->
        <div>
          <!-- Main Image -->
          <div class="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
            <img 
              :src="selectedImage || product.images[0] || '/placeholder-product.jpg'" 
              :alt="product.name"
              class="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition duration-300"
              @click="openImageModal"
            />
          </div>

          <!-- Thumbnail Images -->
          <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-2">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer border-2 transition"
              :class="selectedImage === image ? 'border-primary-600' : 'border-transparent hover:border-gray-300'"
              @click="selectedImage = image"
            >
              <img :src="image" :alt="`${product.name} ${Number(index) + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div>
          <!-- Category Badge -->
          <div class="mb-3">
            <span class="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
              {{ product.category.name }}
            </span>
          </div>

          <!-- Product Name -->
          <h1 class="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            {{ product.name }}
          </h1>

          <!-- Price and Condition -->
          <div class="flex items-center justify-between mb-6 pb-6 border-b">
            <div>
              <p class="text-4xl font-bold text-primary-600">₱{{ formatPrice(product.price) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Condition</p>
              <p class="text-lg font-semibold text-gray-900">{{ product.condition }}</p>
            </div>
          </div>

          <!-- Availability -->
          <div class="mb-6">
            <div v-if="product.isAvailable" class="flex items-center text-green-600">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-semibold">In Stock</span>
            </div>
            <div v-else class="flex items-center text-red-600">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <span class="font-semibold">Sold Out</span>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button 
            v-if="product.isAvailable"
            @click="addToCart"
            class="w-full btn btn-primary py-4 text-lg mb-4"
          >
            <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>
          <button 
            v-else
            disabled
            class="w-full btn bg-gray-300 text-gray-500 cursor-not-allowed py-4 text-lg mb-4"
          >
            Sold Out
          </button>

          <!-- Material Info -->
          <div v-if="product.material" class="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-1">Material</h3>
            <p class="text-gray-900">{{ product.material }}</p>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h2 class="text-xl font-serif font-bold mb-3">Description</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
          </div>

          <!-- History -->
          <div v-if="product.history" class="bg-secondary-50 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-serif font-bold mb-3">Item History</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ product.history }}</p>
          </div>

          <!-- Contact Information -->
          <div class="border-t pt-6">
            <p class="text-sm text-gray-600 mb-2">Questions about this item?</p>
            <NuxtLink to="/contact" class="text-primary-600 hover:text-primary-700 font-semibold">
              Contact us →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts && relatedProducts.length > 0" class="mt-16">
        <h2 class="text-2xl font-serif font-bold mb-6">Similar Items You May Like</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="item in relatedProducts" :key="item.id" class="card hover:shadow-xl transition">
            <NuxtLink :to="`/products/${item.slug}`">
              <div class="aspect-square bg-gray-200 overflow-hidden">
                <img 
                  v-if="item.images && item.images[0]" 
                  :src="item.images[0]" 
                  :alt="item.name"
                  class="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div class="p-4">
                <h3 class="font-serif font-bold text-lg mb-2 line-clamp-2">{{ item.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-primary-600 font-bold">₱{{ formatPrice(item.price) }}</span>
                  <span class="text-xs text-gray-500">{{ item.condition }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal (for zoom) -->
    <div 
      v-if="showImageModal" 
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click="closeImageModal"
    >
      <button 
        class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
        @click="closeImageModal"
      >
        ×
      </button>
      <img 
        :src="selectedImage || product.images[0]" 
        :alt="product.name"
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const slug = route.params.slug as string

const product = ref<any>(null)
const relatedProducts = ref<any[]>([])
const loading = ref(true)
const error = ref(false)
const selectedImage = ref('')
const showImageModal = ref(false)

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('en-PH').format(Number(price))
}

const addToCart = () => {
  const cartStore = useCartStore()
  const result = cartStore.addItem(product.value)
  
  if (result.success) {
    // Show success message and redirect to cart
    if (confirm(`"${product.value.name}" added to cart!\n\nGo to cart now?`)) {
      navigateTo('/cart')
    }
  } else {
    alert(result.message)
  }
}

const openImageModal = () => {
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
}

// Fetch product details
const fetchProduct = async () => {
  loading.value = true
  error.value = false
  
  try {
    const { data, error: fetchError } = await useFetch(`/api/products/${slug}`)
    
    if (fetchError.value || !data.value) {
      error.value = true
      return
    }
    
    product.value = data.value
    selectedImage.value = product.value.images[0] || ''
    
    // Fetch related products from same category
    if (product.value.category) {
      const { data: related } = await useFetch('/api/products', {
        query: {
          category: product.value.category.slug,
          limit: 4
        }
      })
      
      // Filter out current product
      relatedProducts.value = (related.value?.products || []).filter(
        (p: any) => p.id !== product.value.id
      ).slice(0, 4)
    }
  } catch (err) {
    console.error('Error fetching product:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

// Set page metadata
useHead(() => ({
  title: product.value ? `${product.value.name} | Powell's Antique Shop` : 'Loading...',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'Vintage bags and collectibles'
    }
  ]
}))

onMounted(() => {
  fetchProduct()
})
</script>
