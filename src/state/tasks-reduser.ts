import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTotodlistActionType, RemoveTodoListActionType} from './todolists-reduser';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistId: string
        taskId: string
    }
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        title: string
    }
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}
type Actionstype =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTotodlistActionType
    | RemoveTodoListActionType

export const tasksReduser = (state: TaskStateType, action: Actionstype): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                        ...el,
                        isDone: action.payload.isDone
                    } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                        ...el,
                        title: action.payload.title
                    } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy ={...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}
