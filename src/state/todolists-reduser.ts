import {FilterValueType, todolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValueType
}
type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType


export const todolistsReducer = (state: Array<todolistType>, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el=>el.id!==action.id)
        case 'ADD-TODOLIST':
            return [...state,{id: v1(), title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id===action.id ? {...el,title:action.title}:el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id===action.id ? {...el,filter:action.filter}:el)
        default:
            throw new Error(`I don't understand action type`);
    }
}
export const RemoveTodolistAC=(todolistId:string):RemoveTodoListActionType=>{
return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const AddTodolistAC=(title:string):AddTotodlistActionType=>{
return {type:'ADD-TODOLIST',title}
}
export const ChangeTodolistTitleAC=(id:string,title:string):ChangeTotodlistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id,title}
}
export const ChangeTodolistFilterAC=(id:string,filter:FilterValueType):ChangeTotodlistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id,filter}
}