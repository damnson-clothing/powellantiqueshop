import { defineStore } from 'pinia'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  slug: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    itemCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },

    total: (state): number => {
      // Add shipping or tax calculation here if needed
      return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  },

  actions: {
    addItem(product: any) {
      const existingItem = this.items.find(item => item.productId === product.id)

      if (existingItem) {
        // For unique antique items, we typically don't increase quantity
        // But showing a message that item is already in cart
        return { success: false, message: 'Item already in cart' }
      }

      this.items.push({
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images[0] || '',
        slug: product.slug,
        quantity: 1
      })

      this.saveToLocalStorage()
      return { success: true, message: 'Item added to cart' }
    },

    removeItem(itemId: string) {
      const index = this.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.quantity = Math.max(1, quantity)
        this.saveToLocalStorage()
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Error loading cart:', e)
          }
        }
      }
    }
  }
})
