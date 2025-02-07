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
import { TodolistList } from '../features/TodolistsList/TodolistList'
import type { AppRootState } from './store'
import { initializeApp } from './app-reducer'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/Auth/Login'
import { logout } from '../features/Auth/auth-reduser'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import Grid from '@mui/material/Grid'
import { addTodolist } from '../features/TodolistsList/todolists-reduser'
import { selectIsInitialized, selectIsLoggedIn, selectStatus } from './selectors'

export type TaskStateType = {
  [key: string]: Array<TaskType>
}
type PropsType = {
  demo?: boolean
}

export const App = memo(({ demo = false, ...props }: PropsType) => {
  const status = useSelector(selectStatus)
  const isInitialized = useSelector<AppRootState, boolean>(selectIsInitialized)
  const isLoggedIn = useSelector<AppRootState, boolean>(selectIsLoggedIn)
  const dispatch = useDispatch()
  const addTodolist = useCallback((title: string) => {
    console.log(title)
    dispatch(addTodolist(title))
  }, [])
  useEffect(() => {
    if (!demo) {
      dispatch(initializeApp())
    }
  }, [])
  const logoutHandler = useCallback(() => {
    dispatch(logout())
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
        <Grid container sx={{ padding: '10px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Routes>
          <Route path={'/'} element={<TodolistList demo={demo} />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </Container>
    </div>
  )
})

export default App
