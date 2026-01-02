<template>
  <div id="app">
    <nav class="main-nav">
      <RouterLink to="/cart">購物車</RouterLink>
      <RouterLink to="/todo">Todo List</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.main-nav {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 12px;
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.main-nav a {
  padding: 8px 16px;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
}

.main-nav a:hover {
  background: #667eea;
  color: white;
}

.main-nav a.router-link-active {
  background: #667eea;
  color: white;
}
</style>s