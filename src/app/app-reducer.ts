import { authApi } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Auth/auth-reduser'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, { dispatch, rejectWithValue }) => {
  try {
    const res = await authApi.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }))
    } else {
    }
  } catch (error) {
    rejectWithValue(null)
  }
})
const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialized: false,
  } as InitialStateType,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true
    })
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC, setAppStatusAC } = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'successes' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  // Когда приложение про инициализовалось
  isInitialized: boolean
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
