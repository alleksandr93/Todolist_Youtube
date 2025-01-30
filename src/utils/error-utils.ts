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
export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'Some error occurred'

  if (typeof error === 'string') {
    // Если error — строка, используем её как сообщение
    errorMessage = error
  } else if (error instanceof Error) {
    // Если error — объект Error, используем его message
    errorMessage = error.message
  }

  // Диспатчим ошибку и статус
  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
