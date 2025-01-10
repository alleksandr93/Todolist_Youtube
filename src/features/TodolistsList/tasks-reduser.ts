import type { Dispatch } from 'redux'
import { TaskStateType } from '../../app/App'
import type { AppRootState } from '../../app/store'
import {
  type AddTotodlistActionType,
  changeTodolistEntityStatusAC,
  type ChangeTodolistEntityStatusActionType,
  type ClearDataActionType,
  type RemoveTodoListActionType,
  type SetTodolistsType,
} from './todolists-reduser'
import {
  TaskStatuses,
  type TaskType,
  todolistsApi,
  TodoTaskPriorities,
  type UpdateTaskModelType,
} from '../../api/todolists-api'
import {
  setAppErrorAC,
  type SetAppErrorActionType,
  setAppStatusAC,
  type SetAppStatusActionType,
} from '../../app/app-reducer'
import type { SetStateAction } from 'react'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState: TaskStateType = {}
export const tasksReduser = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId),
      }
    case 'ADD-TASK':
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t,
        ),
      }
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] }
    case 'REMOVE-TODOLIST':
      const stateCopy = { ...state }
      delete stateCopy[action.id]
      return stateCopy
    case 'SET_TODOLISTS':
      const copyState = { ...state }
      action.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    case 'SET_TASKS':
      return { ...state, [action.todolistId]: action.tasks }
    case 'CLEAR_DATA':
      return {}
    default:
      return state
  }
}
//actions
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (task: TaskType) => {
  return { type: 'ADD-TASK', task } as const
}
export const updateTaskAC = (payload: { todolistId: string; taskId: string; model: UpdateDomaineTaskModelType }) => {
  return { type: 'UPDATE-TASK', payload } as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
  return { type: 'SET_TASKS', todolistId, tasks } as const
}
//thunk
export const fetchTasksTС = (id: string) => {
  return (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTasks(id).then(res => {
      dispatch(setTasksAC(id, res.data.items))
      dispatch(setAppStatusAC('successes'))
    })
  }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then(() => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
  }
}
export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item))
          dispatch(setAppStatusAC('successes'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
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
  return (dispatch: ThunkDispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
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
      ...domainModel,
    }

    todolistsApi
      .updateTask(todolistId, taskId, apiModule)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ todolistId, taskId, model: apiModule }))
          dispatch(setAppStatusAC('successes'))
          dispatch(changeTodolistEntityStatusAC(todolistId, 'successes'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
//types
type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTotodlistActionType
  | RemoveTodoListActionType
  | SetTodolistsType
  | ReturnType<typeof setTasksAC>
  | ChangeTodolistEntityStatusActionType
  | ClearDataActionType

type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>
