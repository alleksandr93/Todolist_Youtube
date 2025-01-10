import { applyMiddleware, combineReducers, createStore } from 'redux'
import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import thunk, { type ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReduser } from '../features/Login/auth-reduser'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReduser,
  app: appReducer,
  auth: authReduser,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk)) // 2 аргумент чтобы thunk работал
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, any>
// @ts-ignore
window.store = store
