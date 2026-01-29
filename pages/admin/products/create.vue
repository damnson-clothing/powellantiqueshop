<template>
  <NuxtLayout name="admin">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/admin/products" class="text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← Back to Products
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p class="mt-2 text-sm text-gray-700">Add a new product to your inventory</p>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {{ error }}
      </div>

      <!-- Product Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8 bg-white shadow sm:rounded-lg p-6">
        <!-- Basic Information -->
        <div class="space-y-6">
          <h2 class="text-lg font-medium text-gray-900">Basic Information</h2>
          
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Price ($) *</label>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="condition" class="block text-sm font-medium text-gray-700">Condition *</label>
              <select
                id="condition"
                v-model="form.condition"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div>
            <label for="categoryId" class="block text-sm font-medium text-gray-700">Category *</label>
            <select
              id="categoryId"
              v-model="form.categoryId"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <h2 class="text-lg font-medium text-gray-900">Product Details</h2>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="material" class="block text-sm font-medium text-gray-700">Material</label>
              <input
                id="material"
                v-model="form.material"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div class="sm:col-span-2">
              <label for="history" class="block text-sm font-medium text-gray-700">History / Provenance</label>
              <textarea
                id="history"
                v-model="form.history"
                rows="3"
                placeholder="Historical information about this item..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="flex items-center">
              <input
                id="isAvailable"
                v-model="form.isAvailable"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="isAvailable" class="ml-2 block text-sm text-gray-900">
                Available for Purchase
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="isFeatured"
                v-model="form.isFeatured"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="isFeatured" class="ml-2 block text-sm text-gray-900">
                Featured Product
              </label>
            </div>
          </div>
        </div>

        <!-- Images -->
        <div class="space-y-6">
          <h2 class="text-lg font-medium text-gray-900">Images</h2>
          <p class="text-sm text-gray-500 mb-3">Upload product images. The first image will be the main product image.</p>
          
          <!-- File Upload -->
          <div class="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              @change="handleImageUpload"
              class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100
                cursor-pointer"
            />
            <p class="mt-1 text-xs text-gray-500">{{ form.images.length }} image(s) added</p>
          </div>

          <!-- Image Preview -->
          <div v-if="form.images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="(image, index) in form.images"
              :key="index"
              class="relative group"
            >
              <img
                :src="image"
                :alt="`Product image ${index + 1}`"
                class="w-full h-32 object-cover rounded-lg border-2"
                :class="index === 0 ? 'border-primary-500' : 'border-gray-200'"
              />
              <div v-if="index === 0" class="absolute top-1 left-1 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                Main
              </div>
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- URL Input (Alternative) -->
          <details class="mt-4">
            <summary class="text-sm text-gray-600 cursor-pointer hover:text-primary-600">Or add image URLs manually</summary>
            <div class="mt-2">
              <textarea
                v-model="imagesText"
                rows="4"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono text-xs"
              ></textarea>
            </div>
          </details>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <NuxtLink
            to="/admin/products"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting">Creating...</span>
            <span v-else>Create Product</span>
          </button>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()

const categories = ref<any[]>([])
const error = ref<string | null>(null)
const submitting = ref(false)

const form = ref({
  name: '',
  description: '',
  price: 0,
  categoryId: '',
  condition: 'Excellent',
  material: '',
  history: '',
  images: [] as string[],
  isAvailable: true,
  isFeatured: false
})

const imagesText = ref('')

// Watch images text and convert to array
watch(imagesText, (value) => {
  form.value.images = value
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0)
})

// Fetch categories
const fetchCategories = async () => {
  try {
    const data = await $fetch('/api/categories')
    categories.value = data
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    submitting.value = true
    error.value = null

    await $fetch('/api/admin/products', {
      method: 'POST',
      body: form.value
    })

    alert('Product created successfully!')
    router.push('/admin/products')
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Failed to create product'
  } finally {
    submitting.value = false
  }
}

// Handle image file upload
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  
  if (!files || files.length === 0) return

  try {
    for (const file of Array.from(files)) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        continue
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 2MB.`)
        continue
      }

      // Convert to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        form.value.images.push(base64)
      }
      reader.readAsDataURL(file)
    }
  } catch (err) {
    console.error('Error uploading images:', err)
    alert('Failed to upload images')
  }

  // Clear the input
  input.value = ''
}

// Remove image
const removeImage = (index: number) => {
  form.value.images.splice(index, 1)
}

onMounted(() => {
  fetchCategories()
})
</script>
