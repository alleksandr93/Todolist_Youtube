import { tasksReduser } from './tasks-reduser'
import { addTodolistTC, TodolistDomainType, todolistsReducer } from './todolists-reduser'
import { TaskStateType } from '../../app/App'

test('ids should be eauals', () => {
  const startTasksState: TaskStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []
  const todolist = { id: '1', title: '1', order: 0, addedDate: '' }
  const action = addTodolistTC.fulfilled({ todolist }, 'requiredId', todolist.title)

  const endTasksState = tasksReduser(startTasksState, action)
  const endTodolistState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
