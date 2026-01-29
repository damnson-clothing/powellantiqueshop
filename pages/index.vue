<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="container-custom text-center">
        <h1 class="text-5xl font-serif font-bold mb-4">Powell's Antique Shop</h1>
        <p class="text-xl mb-8">Vintage Bags & Collectibles Since 2010</p>
        <NuxtLink to="/products" class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
          Shop Now
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container-custom py-16">
      <h2 class="text-3xl font-serif font-bold text-center mb-12">Featured Items</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Product cards will be loaded dynamically -->
        <div v-if="loading" class="col-span-full text-center py-12">
          <p class="text-gray-500">Loading featured items...</p>
        </div>
        
        <div v-else-if="featuredProducts.length === 0" class="col-span-full text-center py-12">
          <p class="text-gray-500">No featured products available.</p>
        </div>

        <div v-else v-for="product in featuredProducts" :key="product.id" class="card hover:shadow-xl transition">
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

      <div class="text-center mt-12">
        <NuxtLink to="/products" class="btn btn-primary px-8 py-3">
          View All Products
        </NuxtLink>
      </div>
    </section>

    <!-- About Preview -->
    <section class="bg-secondary-50 py-16">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-serif font-bold mb-6">Our Story</h2>
          <p class="text-gray-700 mb-6">
            Founded in 2010 by Joy V. Powell and Nilo U. Powell, Powell's Antique Shop has been 
            bringing the beauty of vintage bags and collectibles to Baguio City. From our humble 
            beginnings at EastPark Harrison Road to our current location at Skyworld, Session Road, 
            we've grown with our community while maintaining our commitment to quality and authenticity.
          </p>
          <NuxtLink to="/about" class="btn btn-outline">
            Learn More About Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const featuredProducts = ref<any[]>([])
const loading = ref(true)

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('en-PH').format(Number(price))
}

// Fetch featured products
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/products?featured=true&limit=3')
    featuredProducts.value = data.value?.products || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
  } finally {
    loading.value = false
  }
})
</script>
