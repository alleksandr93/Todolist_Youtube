import { todolistsApi, TodolistType } from '../../api/todolists-api'
import type { Dispatch } from 'redux'
import { type RequestStatusType, setAppStatusAC, type SetAppStatusActionType } from '../../app/app-reducer'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(el => el.id !== action.id)
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'All', entityStatus: 'idle' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(el => (el.id === action.id ? { ...el, title: action.title } : el))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(el => (el.id === action.id ? { ...el, filter: action.filter } : el))
    case 'SET_TODOLISTS':
      return action.todolists.map(tl => ({ ...tl, filter: 'All', entityStatus: 'idle' }))
    case 'CHANGE_TODOLIST_ENTITY_STATUS':
      return state.map(tl => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
    default:
      return state
  }
}
//actions
export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
  return { type: 'ADD-TODOLIST', todolist } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', id, filter } as const
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
  return { type: 'CHANGE_TODOLIST_ENTITY_STATUS', id, status } as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return { type: 'SET_TODOLISTS', todolists } as const
}
//thunk
export const fetchTodolistsTС = () => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolistAPI().then(res => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC('successes'))
    })
  }
}
export const removeTodolistTC = (id: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistsApi.deleteTodolistAPI(id).then(() => {
      dispatch(removeTodolistAC(id))
      dispatch(setAppStatusAC('successes'))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolistAPI(title).then(res => {
      dispatch(addTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('successes'))
    })
  }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsApi.updateTodolistAPI(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC(todolistId, title))
    })
  }
}
//types
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTotodlistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionType =
  | RemoveTodoListActionType
  | AddTotodlistActionType
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | SetTodolistsType
  | ChangeTodolistEntityStatusActionType
export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType>
