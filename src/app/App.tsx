import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskType } from '../api/todolists-api'
import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { CustomizedSnackbars } from '../components/ErrorSnackBar/ErrorSnackBar'
import { TodolistLIst } from '../features/TodolistsList/TodolistLIst'
import type { AppRootState } from './store'
import { initializeAppTC, type RequestStatusType } from './app-reducer'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { logoutTC } from '../features/Login/auth-reduser'

export type TaskStateType = {
  [key: string]: Array<TaskType>
}
type PropsType = {
  demo?: boolean
}
export const App = memo(({ demo = false, ...props }: PropsType) => {
  const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootState, boolean>(status => status.auth.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC())
    }
  }, [])
  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])
  if (!isInitialized) {
    return (
      <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    )
  }

  return (
    <div className="App">
      <CustomizedSnackbars />
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          {/* Пишем  component и to чтобы привязыть кномпу перехода к логинизации*/}
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === 'loading' && (
        <LinearProgress style={{ position: 'absolute', top: '0', left: '0', width: '100%' }} color="primary" />
      )}
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistLIst demo={demo} />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </Container>
    </div>
  )
})

export default App
