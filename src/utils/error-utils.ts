import {
  setAppErrorAC,
  type SetAppErrorActionType,
  setAppStatusAC,
  type SetAppStatusActionType,
} from '../app/app-reducer'
import type { ResponseType } from '../api/todolists-api'
import type { Dispatch } from 'redux'

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: 'Some Error occurred' }))
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message ? error.message : 'Some error occurred' }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
