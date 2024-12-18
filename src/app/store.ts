import { applyMiddleware, combineReducers, createStore } from 'redux'
import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import thunk from 'redux-thunk'
import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReduser,
  app: appReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk)) // 2 аргумент чтобы thunk работал

// @ts-ignore
window.store = store
