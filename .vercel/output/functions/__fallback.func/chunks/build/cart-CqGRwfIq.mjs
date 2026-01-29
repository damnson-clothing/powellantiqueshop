import { e as defineStore } from './server.mjs';

const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    itemCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    total: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find((item) => item.productId === product.id);
      if (existingItem) {
        return { success: false, message: "Item already in cart" };
      }
      this.items.push({
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images[0] || "",
        slug: product.slug,
        quantity: 1
      });
      this.saveToLocalStorage();
      return { success: true, message: "Item added to cart" };
    },
    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    updateQuantity(itemId, quantity) {
      const item = this.items.find((item2) => item2.id === itemId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        this.saveToLocalStorage();
      }
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
    },
    loadFromLocalStorage() {
    }
  }
});

export { useCartStore as u };
//# sourceMappingURL=cart-CqGRwfIq.mjs.map
