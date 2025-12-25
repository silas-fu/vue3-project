export interface Todo {
  id: number           // 每個待辦事項的唯一識別碼
  text: string         // 待辦事項的文字內容
  completed: boolean   // 是否已完成
  createdAt: Date      // 建立時間
}