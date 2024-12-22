import * as React from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import type { AppRootState } from '../../app/store'
import { setAppErrorAC } from '../../app/app-reducer'

export const CustomizedSnackbars = () => {
  const error = useSelector<AppRootState, string | null>(state => state.app.error)
  const dispatch = useDispatch()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
