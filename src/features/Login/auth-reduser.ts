import type { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer'
import { authApi, type LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { clearTodosDataAC } from '../TodolistsList/todolists-reduser'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // PayloadAction Это типизация что мы передает в диспатч какие параметры
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})
export const authReduser = slice.reducer
export const { setIsLoggedInAC } = slice.actions
//thunk
export const loginTС = (data: LoginParamsType) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authApi
      .login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC({ value: true }))
          dispatch(setAppStatusAC({ status: 'successes' }))
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
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authApi
      .logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC({ value: true }))
          dispatch(setAppStatusAC({ status: 'successes' }))
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
