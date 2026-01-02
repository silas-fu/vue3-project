<template>
  <div class="cart-view">
    <header class="header">
      <h1>🛒 購物商城</h1>
      <div class="cart-summary">
        <span class="cart-count">{{ cartStore.cartItemCount }} 件商品</span>
        <span class="cart-total">NT$ {{ cartStore.cartTotal.toLocaleString() }}</span>
      </div>
    </header>

    <div class="container">
      <!-- 商品列表 -->
      <section class="products-section">
        <h2>商品列表</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="cartStore.addToCart"
          />
        </div>
      </section>

      <!-- 購物車 -->
      <aside class="cart-section">
        <div class="cart-sticky">
          <h2>
            購物車
            <span v-if="cartStore.cartItemCount > 0" class="badge">
              {{ cartStore.cartItemCount }}
            </span>
          </h2>

          <div v-if="cartStore.cartItems.length === 0" class="empty-cart">
            <p>購物車是空的</p>
            <p class="empty-hint">快去選購商品吧！</p>
          </div>

          <div v-else class="cart-content">
            <div class="cart-items">
              <CartItem
                v-for="item in cartStore.cartItems"
                :key="item.id"
                :item="item"
                @increase="cartStore.increaseQuantity"
                @decrease="cartStore.decreaseQuantity"
                @remove="cartStore.removeFromCart"
              />
            </div>

            <div class="cart-footer">
              <div class="total-section">
                <div class="total-row">
                  <span class="total-label">商品總計</span>
                  <span class="total-value">{{ cartStore.cartItemCount }} 件</span>
                </div>
                <div class="total-row total-price">
                  <span class="total-label">總金額</span>
                  <span class="total-amount">NT$ {{ cartStore.cartTotal.toLocaleString() }}</span>
                </div>
              </div>

              <button @click="handleCheckout" class="btn-checkout">
                結帳
              </button>

              <button @click="cartStore.clearCart" class="btn-clear">
                清空購物車
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore, type Product } from '@/stores/cart'
import ProductCard from '@/components/cart/ProductCard.vue'
import CartItem from '@/components/cart/CartItem.vue'

const cartStore = useCartStore()

// 模擬商品資料
const products: Product[] = [
  {
    id: 1,
    name: '筆記型電腦',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    description: '高效能筆電，適合工作與娛樂'
  },
  {
    id: 2,
    name: '無線耳機',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: '降噪功能，音質清晰'
  },
  {
    id: 3,
    name: '智慧手錶',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: '健康追蹤，訊息通知'
  },
  {
    id: 4,
    name: '機械鍵盤',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    description: 'RGB背光，手感極佳'
  },
  {
    id: 5,
    name: '滑鼠',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    description: '人體工學設計，精準控制'
  },
  {
    id: 6,
    name: '相機',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
    description: '專業攝影，記錄美好'
  }
]

function handleCheckout() {
  if (cartStore.cartItemCount === 0) {
    alert('購物車是空的！')
    return
  }
  
  const confirmed = confirm(
    `確認結帳？\n總計: NT$ ${cartStore.cartTotal.toLocaleString()}\n共 ${cartStore.cartItemCount} 件商品`
  )
  
  if (confirmed) {
    alert('結帳成功！感謝您的購買 🎉')
    cartStore.clearCart()
  }
}
</script>

<style scoped>
.cart-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.header {
  max-width: 1400px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  color: #667eea;
  font-size: 2rem;
}

.cart-summary {
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 1.1rem;
}

.cart-count {
  color: #666;
}

.cart-total {
  font-weight: bold;
  color: #667eea;
  font-size: 1.3rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.products-section h2,
.cart-section h2 {
  color: white;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  background: #e74c3c;
  color: white;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: normal;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.cart-section {
  position: relative;
}

.cart-sticky {
  position: sticky;
  top: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-cart p {
  margin: 8px 0;
  font-size: 1.1rem;
}

.empty-hint {
  font-size: 0.95rem;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-items {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;
}

.cart-items::-webkit-scrollbar {
  width: 6px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 10px;
}

.cart-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.total-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #666;
}

.total-price {
  font-size: 1.1rem;
  padding-top: 8px;
  border-top: 1px solid #e0e0e0;
}

.total-price .total-label {
  color: #333;
  font-weight: 600;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #667eea;
}

.btn-checkout,
.btn-clear {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-checkout {
  background: #667eea;
  color: white;
}

.btn-checkout:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-clear {
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.btn-clear:hover {
  background: #e74c3c;
  color: white;
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }

  .cart-sticky {
    position: static;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .cart-summary {
    flex-direction: column;
    gap: 8px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>