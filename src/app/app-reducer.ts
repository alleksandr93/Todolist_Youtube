import type { Dispatch } from 'redux'
import { authApi } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reduser'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: true,
}
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC, setAppInitializedAC, setAppStatusAC } = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }))
    } else {
      dispatch(setAppInitializedAC({ isInitialized: false }))
    }
    dispatch(setAppInitializedAC({ isInitialized: true }))
  })
}

export type RequestStatusType = 'idle' | 'loading' | 'successes' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  // Когда приложение про инициализовалось
  isInitialized: boolean
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
