import axios from 'axios'
export const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '4c61ed4e-d0e7-481a-b073-5bb18a604f68',
  },
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
})
//api
export const todolistsApi = {
  getTodolistAPI() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolistAPI(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
  },
  deleteTodolistAPI(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolistAPI(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title })
  },
  getTasks(id: string) {
    return instance.get<GetTaskReponse>(`todo-lists/${id}/tasks`)
  },
  createTask(id: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${id}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
//types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D = {}> = {
  fieldsErrors: []
  messages: string[]
  resultCode: number
  data: D
}
export type GetTaskReponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TodoTaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TodoTaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  completed: boolean
  status: TaskStatuses
  priority: TodoTaskPriorities
  startDate: string
  deadline: string
}
