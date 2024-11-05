import axios from 'axios';

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4c61ed4e-d0e7-481a-b073-5bb18a604f68'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number

}
type ResponseType<D = {}> = {
    fieldsErrors: []
    messages: []
    resultCode: number
    data: D
}

export type GetTaskReponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}
export type UpdateTaskModelType ={
    title:string
    description:string
    completed:boolean
    status:number
    priority:number
    startDate:string
    deadline:string
}
export const todolistsApi = {
    getTodolistAPI() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolistAPI(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolistAPI(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistAPI(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(id: string) {
        return instance.get<GetTaskReponse>(`todo-lists/${id}/tasks`)
    },
    createTasks(id: string, title: string) {
        return instance.post<GetTaskReponse>(`todo-lists/${id}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,obj:UpdateTaskModelType){
         return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,obj)
    }

}

