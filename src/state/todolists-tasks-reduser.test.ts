
import {tasksReduser} from './tasks-reduser';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reduser';
import {TaskStateType} from '../AppWithRedux';

test('ids should be eauals',()=>{
    const startTasksState:TaskStateType={}
    const startTodolistsState:Array<TodolistDomainType>=[]

    const action = addTodolistAC('new todolist')

    const endTasksState=tasksReduser(startTasksState,action)
    const endTodolistState=todolistsReducer(startTodolistsState,action)

    const keys=Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
