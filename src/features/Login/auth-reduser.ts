import { setAppStatusAC } from '../../app/app-reducer'
import { authApi, type FieldErrorType, type LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import { clearTasksAndTodolists } from '../../common/actions/common.action'

export const loginTC = createAsyncThunk<
  undefined,
  LoginParamsType,
  { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } }
>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authApi.login(param)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'successes' }))
      localStorage.setItem('sn-token', res.data.data.token)
      return
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
  }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authApi.logout()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'successes' }))
      thunkAPI.dispatch(clearTasksAndTodolists())
      localStorage.removeItem('sn-token')
      return
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({})
    }
  } catch (e) {
    handleServerNetworkError(e, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({})
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = true
    })
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false
    })
  },
})
export const authReduser = slice.reducer
export const { setIsLoggedInAC } = slice.actions
