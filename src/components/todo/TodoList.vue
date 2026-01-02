<template>
  <div class="todo-container">
    <h1>待辦事項</h1>

    <!-- 輸入框 -->
    <div class="input-section">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="輸入新的待辦事項..."
        class="todo-input"
        @keyup.enter="handleAddTodo"
      />
      <button class="add-btn" @click="handleAddTodo">新增</button>
    </div>

    <!-- 統計資訊 -->
    <div class="stats">
      <span>總共: {{ todoStore.totalTodos }}</span>
      <span>進行中: {{ todoStore.activeTodos }}</span>
      <span>已完成: {{ todoStore.completedTodos }}</span>
    </div>

    <!-- 待辦事項列表 -->
    <div class="todo-list">
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="todoStore.toggleTodo(todo.id)"
        @remove="todoStore.removeTodo(todo.id)"
      />
      <p v-if="todoStore.totalTodos === 0" class="empty-message">
        目前沒有待辦事項，開始新增一個吧！
      </p>
    </div>

    <!-- 清除已完成按鈕 -->
    <button
      v-if="todoStore.completedTodos > 0"
      class="clear-btn"
      @click="todoStore.clearCompleted"
    >
      清除已完成 ({{ todoStore.completedTodos }})
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import TodoItem from '../components/TodoItem.vue'

const todoStore = useTodoStore()
const newTodoText = ref('')

const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #42b983;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #35a372;
}

.stats {
  display: flex;
  justify-content: space-around;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: #555;
}

.todo-list {
  min-height: 200px;
  margin-bottom: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 3rem 0;
  font-style: italic;
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #ee5a5a;
}
</style>