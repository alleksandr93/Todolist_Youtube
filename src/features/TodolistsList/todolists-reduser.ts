import { todolistsApi, TodolistType } from '../../api/todolists-api'
import type { Dispatch } from 'redux'
import { type RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { handleServerNetworkError } from '../../utils/error-utils'
import { fetchTasks } from './tasks-reduser'
import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from '../../common/actions/common.action'

export const fetchTodolists = createAsyncThunk(
  'todolists/fetchTodolists',
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.getTodolistAPI()
      dispatch(setAppStatusAC({ status: 'successes' }))
      res.data.forEach(el => dispatch(fetchTasks(el.id)))
      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)
export const removeTodolist = createAsyncThunk(
  'todolists/removeTodolist',
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
    const res = await todolistsApi.deleteTodolistAPI(todolistId)
    dispatch(setAppStatusAC({ status: 'successes' }))
    return { id: todolistId }
  },
)
export const addTodolist = createAsyncThunk(
  'todolists/addTodolist',
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const res = await todolistsApi.createTodolistAPI(title)
    dispatch(setAppStatusAC({ status: 'successes' }))
    return { todolist: res.data.data.item }
  },
)
export const changeTodolistTitle = createAsyncThunk(
  'todolists/changeTodolist',
  async (param: { todolistId: string; title: string }, { dispatch }) => {
    const res = await todolistsApi.updateTodolistAPI(param.todolistId, param.title)
    return param
  },
)
const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      return action.payload.todolists.map(el => ({ ...el, filter: 'All', entityStatus: 'idle' }))
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      }
    })
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' })
    })
    builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
    })
    builder.addCase(clearTasksAndTodolists.type, () => {
      return []
    })
  },
})
export const todolistsReducer = slice.reducer

export const { changeTodolistFilterAC, changeTodolistEntityStatusAC } = slice.actions

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
}
