import {v1} from 'uuid';

import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reduser';
const todolistId1 = v1()
const todolistId2 = v1()
let startState:Array<TodolistDomainType>
beforeEach(()=>{
    startState = [
        {id: todolistId1, title: 'What to learn', filter:'All',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter:'All',addedDate:'',order:0},
    ]
})
test('user reducer should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('user reducer should be added', () => {
    const newTodolist= "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist)
})
test('correct todolist change its name', () => {
    const newTodolistTitle= "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})
test('correct filter of todolist should be changed', () => {
    let newFilter:FilterValueType= "Completed"

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter))
    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)

})