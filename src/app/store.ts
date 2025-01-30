import { combineReducers } from 'redux'
import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import { appReducer } from './app-reducer'
import { authReduser } from '../features/Login/auth-reduser'
import thunk, { type ThunkAction } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReduser,
  app: appReducer,
  auth: authReduser,
})
// Определяем возвращаемый state
export type AppRootState = ReturnType<RootReducerType>
// определяем тип самой функции для storebook
export type RootReducerType = typeof rootReducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, any>
export type AppDispatch = typeof store.dispatch
// создаем кастомный хук
export const useAppDispatch = () => useDispatch<AppDispatch>()
// @ts-ignore
window.store = store
