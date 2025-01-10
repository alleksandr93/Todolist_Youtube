import type { Dispatch } from 'redux'
import { type SetAppErrorActionType, setAppStatusAC, type SetAppStatusActionType } from '../../app/app-reducer'
import { authApi, type LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { type ClearDataActionType, clearTodosDataAC } from '../TodolistsList/todolists-reduser'

const initialState: InitialStateType = {
  isLoggedIn: false,
}
export const authReduser = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'login/SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}
//actions
export const setIsLoggedInAC = (value: boolean) => {
  return { type: 'login/SET_IS_LOGGED_IN', value } as const
}

//thunk
export const loginTС = (data: LoginParamsType) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi
      .login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setAppStatusAC('successes'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const logoutTC = () => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi
      .logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setAppStatusAC('successes'))
          dispatch(clearTodosDataAC())
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

//types
type ActionType = ReturnType<typeof setIsLoggedInAC>

type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType | ClearDataActionType>
type InitialStateType = {
  isLoggedIn: boolean
}
