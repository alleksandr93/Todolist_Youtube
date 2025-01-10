import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolists/Todolist'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from '../../app/store'
import { addTodolistTC, fetchTodolistsTС, TodolistDomainType } from './todolists-reduser'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Navigate } from 'react-router-dom'

type PropsType = {
  demo?: boolean
}
export const TodolistLIst = ({ demo = false, ...props }: PropsType) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTС())
  }, [])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      {todolists.map(tl => {
        return (
          <div key={tl.id}>
            <Grid container sx={{ padding: '10px' }}>
              <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
              <Grid item>
                <Paper elevation={5} sx={{ padding: '10px' }}>
                  <Todolist todolists={tl} demo={demo} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        )
      })}
    </div>
  )
}
