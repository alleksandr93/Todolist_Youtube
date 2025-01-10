import type { Dispatch } from 'redux'
import { authApi } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reduser'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: true,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_ERROR':
      return { ...state, error: action.error }
    case 'APP/SET_STATUS':
      return { ...state, status: action.status }
    case 'APP/SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}

export const setAppErrorAC = (error: string | null) => {
  return { type: 'APP/SET_ERROR', error } as const
}
export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET_STATUS', status } as const
}
export const setAppInitializedAC = (value: boolean) => {
  return { type: 'APP/SET_IS_INITIALIZED', value } as const
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {
      dispatch(setAppInitializedAC(false))
    }
    dispatch(setAppInitializedAC(true))
  })
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  // Когда приложение про инициализовалось
  isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'successes' | 'failed'
