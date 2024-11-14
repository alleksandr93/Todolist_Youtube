import {v1} from 'uuid';
import {AddTotodlistActionType, RemoveTodoListActionType} from './todolists-reduser';
import {TaskStateType} from '../AppWithRedux';
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolists-api';

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
        status: TaskStatuses
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

const  initialState:TaskStateType = {}
export const tasksReduser = (state: TaskStateType=initialState, action: Actionstype): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask:TaskType = {id: v1(), title: action.payload.title,status:TaskStatuses.New,todoListId:action.payload.todolistId,description:'',startDate:'',deadline:'',addedDate:'',completed:true,order:0,priority:TodoTaskPriorities.Low}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                        ...el,
                        status:action.payload.status
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
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}
