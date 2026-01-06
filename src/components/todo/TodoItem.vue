<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      class="checkbox"
      @change="emit('toggle')"
    />
    <span class="todo-text">{{ todo.text }}</span>
    <button class="delete-btn" @click="emit('remove')">delete</button>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/type/todo'

interface Props {
  todo: Todo
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: []
  remove: []
}>()
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.todo-item:hover {
  border-color: #42b983;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
  background: #f9f9f9;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #2c3e50;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.delete-btn:hover {
  transform: scale(1.2);
}
</style>