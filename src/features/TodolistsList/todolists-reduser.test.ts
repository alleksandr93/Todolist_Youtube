import { v1 } from 'uuid'

import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValueType,
  removeTodolistAC,
  setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolists-reduser'
import type { RequestStatusType } from '../../app/app-reducer'

const todolistId1 = v1()
const todolistId2 = v1()
let startState: Array<TodolistDomainType>
beforeEach(() => {
  startState = [
    { id: todolistId1, title: 'What to learn', entityStatus: 'idle', filter: 'All', addedDate: '', order: 0 },
    { id: todolistId2, title: 'What to buy', entityStatus: 'idle', filter: 'All', addedDate: '', order: 0 },
  ]
})
test('user reducer should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC({ todolistId: todolistId1 }))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
test('user reducer should be added', () => {
  const newTodolist = 'New Todolist'

  const endState = todolistsReducer(
    [],
    addTodolistAC({
      todolist: {
        id: '1',
        title: newTodolist,
        addedDate: '',
        order: 0,
      },
    }),
  )

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe(newTodolist)
})
test('correct todolist change its name', () => {
  const newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: newTodolistTitle }))
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValueType = 'Completed'

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter: newFilter }))
  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})
test('Todolists should be set to the state', () => {
  const endState = todolistsReducer([], setTodolistsAC({ todolists: startState }))
  debugger
  expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({ id: todolistId2, status: newStatus }))
  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})
