const initialState: InitialStateType = {
  status: 'idle',
  error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_ERROR':
      return { ...state, error: action.error }
    case 'APP/SET_STATUS':
      return { ...state, status: action.status }
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
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionType = SetAppErrorActionType | SetAppStatusActionType
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'successes' | 'failed'
