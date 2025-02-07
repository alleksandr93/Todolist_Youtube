import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import { appReducer } from './app-reducer'
import { authReduser } from '../features/Auth/auth-reduser'
import { type ThunkAction } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// определяем тип самой функции для storebook

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReduser,
    app: appReducer,
    auth: authReduser,
  },
})
export type AppRootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, any>
export type AppDispatch = typeof store.dispatch
// создаем кастомный хук
export const useAppDispatch = () => useDispatch<AppDispatch>()
// @ts-ignore
window.store = store
