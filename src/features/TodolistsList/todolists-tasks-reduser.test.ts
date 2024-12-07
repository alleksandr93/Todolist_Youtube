
import {tasksReduser} from './tasks-reduser';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reduser';
import {TaskStateType} from '../../app/App';

test('ids should be eauals',()=>{
    const startTasksState:TaskStateType={}
    const startTodolistsState:Array<TodolistDomainType>=[]

    const action = addTodolistAC({id:'1',title:"1",order:0,addedDate:''})

    const endTasksState=tasksReduser(startTasksState,action)
    const endTodolistState=todolistsReducer(startTodolistsState,action)

    const keys=Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
