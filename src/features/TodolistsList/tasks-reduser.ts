import type { Dispatch } from 'redux'
import { TaskStateType } from '../../app/App'
import type { AppRootState } from '../../app/store'
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  clearTodosDataAC,
  removeTodolistAC,
  setTodolistsAC,
} from './todolists-reduser'
import {
  TaskStatuses,
  type TaskType,
  todolistsApi,
  TodoTaskPriorities,
  type UpdateTaskModelType,
} from '../../api/todolists-api'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: TaskStateType = {}
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomaineTaskModelType }>,
    ) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasksAC(state, action: PayloadAction<{ todolistId: string; tasks: Array<TaskType> }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
    builder.addCase(clearTodosDataAC, (state, action) => {
      state = {}
    })
  },
})
export const tasksReduser = slice.reducer
export const { addTaskAC, setTasksAC, removeTaskAC, updateTaskAC } = slice.actions

//thunk
export const fetchTasksTС = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsApi.getTasks(id).then(res => {
      dispatch(setTasksAC({ todolistId: id, tasks: res.data.items }))
      dispatch(setAppStatusAC({ status: 'successes' }))
    })
  }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then(() => {
      dispatch(removeTaskAC({ todolistId, taskId }))
    })
  }
}
export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsApi
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC({ task: res.data.data.item }))
          dispatch(setAppStatusAC({ status: 'successes' }))
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
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
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
          dispatch(setAppStatusAC({ status: 'successes' }))
          dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'successes' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
