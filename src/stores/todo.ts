import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo } from '@/type/todo'

export const useTodoStore = defineStore('todo', () => {
  // pinia state
  const todos = ref<Todo[]>([]) // 存儲所有待辦事項的陣列
  const nextId = ref(1)         // 下一個 Todo 的 ID

  // pinia getter
  const totalTodos = computed(() => todos.value.length)
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed).length)
  const activeTodos = computed(() => todos.value.filter(todo => !todo.completed).length)

  // 新增待辦事項
    /**
   * 檢查輸入是否為空
   * 創建一個新的 Todo 物件
   * 添加到 todos 陣列
   * ID 自動遞增
   */
  // pinia action
  function addTodo(text: string) {
    if (text.trim() === '') return // 排除空字串

    todos.value.push({
      id: nextId.value++,   // 當前ID
      text: text.trim(),    // 排除空白
      completed: false,     // 初始狀態
      createdAt: new Date() // 記錄建立時間
    })
  }

  // 刪除待辦事項
  function removeTodo(id: number) {
    // 找到指定 id 的 todo 在陣列中的位置
    const index = todos.value.findIndex(todo => todo.id === id)
    // 從 index 位置刪除 1 個元素
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  // 切換完成狀態
  function toggleTodo(id: number) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // 清除已完成
  function clearCompleted() {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  return {
    todos,
    totalTodos,
    completedTodos,
    activeTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted
  }
})