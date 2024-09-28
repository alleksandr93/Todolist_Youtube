import {FilterValueType, todolistType} from '../AppWithRedux';
import {v1} from 'uuid';


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST'
    todolistId:string
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType
export const todolistId1 = v1()
export const todolistId2 = v1()
const  initialState:Array<todolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
]
export const todolistsReducer = (state: Array<todolistType>=initialState, action: ActionTypes):Array<todolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el=>el.id!==action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'All'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id===action.id ? {...el,title:action.title}:el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id===action.id ? {...el,filter:action.filter}:el)
        default:
           return state
    }
}

export const removeTodolistAC=(todolistId:string):RemoveTodoListActionType=>{
return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const addTodolistAC=(title:string):AddTotodlistActionType=>{
return {type:'ADD-TODOLIST',todolistId:v1(),title}
}
export const changeTodolistTitleAC=(id:string, title:string):ChangeTotodlistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id,title}
}
export const changeTodolistFilterAC=(id:string, filter:FilterValueType):ChangeTotodlistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id,filter}
}