import { todolistsApi, TodolistType } from '../../api/todolists-api'
import type { Dispatch } from 'redux'
import { type RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { handleServerNetworkError } from '../../utils/error-utils'
import { fetchTasksTС } from './tasks-reduser'
import type { AppThunk } from '../../app/store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: Array<TodolistDomainType> = []
const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' })
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].title = action.payload.title
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.status
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      //todo посмотреть видео делает он возврат там он ли нет глянуть, потому что только с возвратом тест проходит
      return action.payload.todolists.map(el => ({ ...el, filter: 'All', entityStatus: 'idle' }))
    },
    clearTodosDataAC(state, action: PayloadAction) {
      state = []
    },
  },
})
export const todolistsReducer = slice.reducer

export const {
  removeTodolistAC,
  addTodolistAC,
  setTodolistsAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  clearTodosDataAC,
} = slice.actions

//thunk
export const fetchTodolistsTС = (): AppThunk => {
  return dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsApi
      .getTodolistAPI()
      .then(res => {
        dispatch(setTodolistsAC({ todolists: res.data }))
        dispatch(setAppStatusAC({ status: 'successes' }))
        return res.data
      })
      .then(todos => {
        todos.forEach(el => dispatch(fetchTasksTС(el.id)))
      })

      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistEntityStatusAC({ id, status: 'loading' }))
    todolistsApi.deleteTodolistAPI(id).then(() => {
      dispatch(removeTodolistAC({ todolistId: id }))
      dispatch(setAppStatusAC({ status: 'successes' }))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsApi.createTodolistAPI(title).then(res => {
      dispatch(addTodolistAC({ todolist: res.data.data.item }))
      dispatch(setAppStatusAC({ status: 'successes' }))
    })
  }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsApi.updateTodolistAPI(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC({ id: todolistId, title }))
    })
  }
}
//types
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTotodlistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
}
