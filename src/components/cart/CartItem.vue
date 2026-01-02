<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    
    <div class="item-info">
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-price">NT$ {{ item.price.toLocaleString() }}</p>
    </div>

    <div class="item-controls">
      <div class="quantity-control">
        <button @click="emit('decrease', item.id)" class="btn-quantity">
          <span>−</span>
        </button>
        <span class="quantity">{{ item.quantity }}</span>
        <button @click="emit('increase', item.id)" class="btn-quantity">
          <span>+</span>
        </button>
      </div>
      
      <div class="item-subtotal">
        小計: NT$ {{ (item.price * item.quantity).toLocaleString() }}
      </div>
    </div>

    <button @click="emit('remove', item.id)" class="btn-remove" title="移除">
      ✕
    </button>
  </div>
</template>
<script setup lang="ts">
import type { CartItem } from '@/stores/cart'

defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  increase: [id: number]
  decrease: [id: number]
  remove: [id: number]
}>()
</script>
<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 14px;
  color: #667eea;
  margin: 0;
}

.item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
}

.btn-quantity {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  color: #667eea;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-quantity:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.btn-quantity:active {
  transform: scale(0.95);
}

.quantity {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
  color: #333;
}

.item-subtotal {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.btn-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: #fee;
  color: #e74c3c;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.btn-remove:hover {
  opacity: 1;
  background: #e74c3c;
  color: white;
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .cart-item {
    flex-wrap: wrap;
  }

  .item-controls {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>