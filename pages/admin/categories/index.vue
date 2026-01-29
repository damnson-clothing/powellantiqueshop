<template>
  <NuxtLayout name="admin">
    <div>
      <div class="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 class="text-3xl font-serif font-bold text-gray-900">Categories</h1>
          <p class="mt-2 text-sm text-gray-700">Manage product categories</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            @click="showCreateModal = true"
            class="btn btn-primary"
          >
            Add Category
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">Loading categories...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <!-- Categories Table -->
      <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                <div v-if="category.description" class="text-sm text-gray-500">{{ category.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ category.slug }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ category._count.products }} product(s)
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="editCategory(category)"
                  class="text-primary-600 hover:text-primary-900"
                >
                  Edit
                </button>
                <button
                  @click="deleteCategory(category)"
                  class="text-red-600 hover:text-red-900"
                  :disabled="category._count.products > 0"
                  :class="{ 'opacity-50 cursor-not-allowed': category._count.products > 0 }"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="categories.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                No categories found. Create your first category to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingCategory" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="closeModal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            {{ editingCategory ? 'Edit Category' : 'Create Category' }}
          </h3>
          
          <div v-if="modalError" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ modalError }}
          </div>

          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="btn btn-primary"
              >
                {{ submitting ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const categories = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const showCreateModal = ref(false)
const editingCategory = ref<any>(null)
const submitting = ref(false)
const modalError = ref<string | null>(null)

const form = ref({
  name: '',
  description: ''
})

const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await $fetch('/api/admin/categories')
    categories.value = data
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to load categories'
  } finally {
    loading.value = false
  }
}

const editCategory = (category: any) => {
  editingCategory.value = category
  form.value = {
    name: category.name,
    description: category.description || ''
  }
}

const saveCategory = async () => {
  try {
    submitting.value = true
    modalError.value = null

    if (editingCategory.value) {
      // Update existing category
      await $fetch(`/api/admin/categories/${editingCategory.value.id}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      // Create new category
      await $fetch('/api/admin/categories', {
        method: 'POST',
        body: form.value
      })
    }

    closeModal()
    await fetchCategories()
  } catch (err: any) {
    modalError.value = err.data?.message || 'Failed to save category'
  } finally {
    submitting.value = false
  }
}

const deleteCategory = async (category: any) => {
  if (category._count.products > 0) {
    alert(`Cannot delete category with ${category._count.products} product(s). Please reassign or delete the products first.`)
    return
  }

  if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
    return
  }

  try {
    await $fetch(`/api/admin/categories/${category.id}`, {
      method: 'DELETE'
    })
    await fetchCategories()
  } catch (err: any) {
    alert(err.data?.message || 'Failed to delete category')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingCategory.value = null
  modalError.value = null
  form.value = {
    name: '',
    description: ''
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
