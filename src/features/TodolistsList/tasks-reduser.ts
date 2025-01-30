import { TaskStateType } from '../../app/App'
import type { AppRootState } from '../../app/store'
import { addTodolistTC, changeTodolistEntityStatusAC, fetchTodolistsTС, removeTodolistTC } from './todolists-reduser'
import { TaskStatuses, todolistsApi, TodoTaskPriorities, type UpdateTaskModelType } from '../../api/todolists-api'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from '../../common/actions/common.action'

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  const res = await todolistsApi.getTasks(id)
  thunkAPI.dispatch(setAppStatusAC({ status: 'successes' }))
  return { todolistId: id, tasks: res.data.items }
})

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { todolistId: string; taskId: string }, thunkAPI) => {
    const res = await todolistsApi.deleteTask(param.todolistId, param.taskId)
    return param
  },
)
export const addTaskTC = createAsyncThunk(
  'tasks/addTask',
  async (param: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTask(param.todolistId, param.title)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: 'successes' }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const updateTaskTC = createAsyncThunk(
  'tasks/updateTask',
  async (param: { todolistId: string; taskId: string; model: UpdateDomaineTaskModelType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: param.todolistId, status: 'loading' }))
    const state: AppRootState = thunkAPI.getState() as AppRootState

    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
      return thunkAPI.rejectWithValue('task not found in the state')
    }
    const apiModule: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      completed: task.completed,
      ...param.model,
    }
    try {
      const res = await todolistsApi.updateTask(param.todolistId, param.taskId, apiModule)

      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: 'successes' }))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: param.todolistId, status: 'successes' }))
        return param
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  },
)
const slice = createSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(fetchTodolistsTС.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
    builder.addCase(clearTasksAndTodolists.type, () => {
      return {}
    })
  },
})
export const tasksReduser = slice.reducer

export type UpdateDomaineTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TodoTaskPriorities
  startDate?: string
  deadline?: string
}
