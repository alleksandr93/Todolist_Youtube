import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolists/Todolist'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodolists } from './todolists-reduser'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn, selectTodolists } from '../../app/selectors'

type PropsType = {
  demo?: boolean
}
export const TodolistList = ({ demo = false, ...props }: PropsType) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolists())
  }, [])
  const todolists = useSelector(selectTodolists)
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      {todolists.map(tl => {
        return (
          <div key={tl.id}>
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
