import type {Dispatch} from 'redux';
import {TaskStateType} from '../../app/App';
import type {AppRootState} from '../../app/store';
import type {AddTotodlistActionType, RemoveTodoListActionType, SetTodolistsType} from './todolists-reduser';
import {
    TaskStatuses,
    type TaskType,
    todolistsApi,
    TodoTaskPriorities,
    type UpdateTaskModelType
} from '../../api/todolists-api';




const initialState: TaskStateType = {}
export const tasksReduser = (state: TaskStateType = initialState, action: Actionstype): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'SET_TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'SET_TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
//actions
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (payload: { todolistId: string, taskId: string, model: UpdateDomaineTaskModelType }) => {
return {type: 'UPDATE-TASK', payload} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET_TASKS',
        todolistId,
        tasks
    } as const
}
//thunk
export const fetchTasksTС = (id: string) => {
    return (dispatch: Dispatch) => todolistsApi.getTasks(id)
        .then((res) => {
            dispatch(setTasksAC(id, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export type UpdateDomaineTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomaineTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModule: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            completed: task.completed,
            ...domainModel
        }

        todolistsApi.updateTask(todolistId, taskId, apiModule)
            .then((res) => {
                dispatch(updateTaskAC({todolistId, taskId, model: apiModule}))
            })
    }
}
//types
type Actionstype =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTotodlistActionType
    | RemoveTodoListActionType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>