// src/stores/cart.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])

  // Getters
  const cartItems = computed(() => items.value)
  
  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })
  
  const cartItemCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0)
  })

  const getItemById = computed(() => {
    return (id: number) => items.value.find(item => item.id === id)
  })

  // Actions
  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function increaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity++
    }
  }

  function decreaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeFromCart(productId)
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  return {
    items,
    cartItems,
    cartTotal,
    cartItemCount,
    getItemById,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    updateQuantity
  }
})