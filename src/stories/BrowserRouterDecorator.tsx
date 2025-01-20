import { Provider } from 'react-redux'

import { combineReducers } from 'redux'
import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import { TaskStatuses, TodoTaskPriorities } from '../api/todolists-api'
import thunk from 'redux-thunk'
import type { AppRootState, RootReducerType } from '../app/store'
import { appReducer } from '../app/app-reducer'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { authReduser } from '../features/Login/auth-reduser'

const rootReducer: RootReducerType = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReduser,
  app: appReducer,
  auth: authReduser,
})

const initialGlobaleState: AppRootState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', entityStatus: 'idle', filter: 'All', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', entityStatus: 'loading', filter: 'All', addedDate: '', order: 0 },
  ],
  tasks: {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'Book',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      },
      {
        id: '2',
        title: 'Tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      },
    ],
  },
  app: {
    status: 'successes',
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
}
// @ts-ignore
export const storyBookStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  preloadedState: initialGlobaleState,
})

export const BrowserRouterDecorator = (storyFn: any) => {
  return (
    <Provider store={storyBookStore}>
      <MemoryRouter>{storyFn()}</MemoryRouter>
    </Provider>
  )
}
