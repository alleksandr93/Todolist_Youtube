import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { TaskType } from '../api/todolists-api'
import './App.css'
import { addTodolistTC } from '../features/TodolistsList/todolists-reduser'
import { LinearProgress } from '@mui/material'
import { CustomizedSnackbars } from '../components/ErrorSnackBar/ErrorSnackBar'
import { TodolistLIst } from '../features/TodolistsList/TodolistLIst'
import type { AppRootState } from './store'
import type { RequestStatusType } from './app-reducer'

export type TaskStateType = {
  [key: string]: Array<TaskType>
}
type PropsType = {
  demo?: boolean
}
export const App = memo(({ demo = false, ...props }: PropsType) => {
  const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch()
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && (
        <LinearProgress style={{ position: 'absolute', top: '0', left: '0', width: '100%' }} color="primary" />
      )}
      <Container fixed>
        <Grid container sx={{ padding: '10px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          <TodolistLIst demo={demo} />
        </Grid>
      </Container>
    </div>
  )
})

export default App
