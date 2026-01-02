<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-footer">
        <span class="product-price">NT$ {{ product.price.toLocaleString() }}</span>
        <button @click="emit('addToCart', product)" class="btn-add">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/stores/cart'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()
</script>
<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #667eea;
}

.btn-add {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background: #5568d3;
  transform: scale(1.05);
}

.btn-add:active {
  transform: scale(0.98);
}
</style>