import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../AppWithRedux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reduser';


test('user reducer should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('user reducer should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newTodolist= "New Todolist"
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist)
})
test('correct todolist change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle= "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})
test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newFilter:FilterValueType= "Completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter))
    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)

})