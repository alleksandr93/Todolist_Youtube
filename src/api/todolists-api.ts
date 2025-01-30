import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

// это надо чтобы токен который хранить в локал сторадже подтягивался с каждым запросом
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`
  return config
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
export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ token: string; userId: number }>>('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}
//types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type FieldErrorType = { field: string; error: string }
export type ResponseType<D = {}> = {
  fieldsErrors?: Array<FieldErrorType>
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
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}
