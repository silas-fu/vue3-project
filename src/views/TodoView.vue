<template>
  <div class="todo-view">
    <TodoList />
  </div>
</template>
<script setup lang="ts">
import TodoList from '../components/TodoList.vue';
</script>
<style scoped>
.todo-view {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}
</style>