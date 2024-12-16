import { Provider } from 'react-redux'
import { AppRootState } from '../app/store'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { tasksReduser } from '../features/TodolistsList/tasks-reduser'
import { todolistsReducer } from '../features/TodolistsList/todolists-reduser'
import { TaskStatuses, TodoTaskPriorities } from '../api/todolists-api'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReduser,
})

const initialGlobaleState: AppRootState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', entityStatus: 'idle', filter: 'All', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', entityStatus: 'idle', filter: 'All', addedDate: '', order: 0 },
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
    status: 'idle',
    error: null,
  },
}
// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobaleState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
