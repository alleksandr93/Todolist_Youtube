import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolists/Todolist'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from '../../app/store'
import { fetchTodolistsTС, TodolistDomainType } from './todolists-reduser'
type PropsType = {
  demo?: boolean
}
export const TodolistLIst = ({ demo = false, ...props }: PropsType) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (demo) {
      return
    }
    dispatch(fetchTodolistsTС())
  }, [])
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
  return (
    <div>
      {todolists.map(tl => {
        return (
          <Grid item key={tl.id}>
            <Paper elevation={5} sx={{ padding: '10px' }}>
              <Todolist todolists={tl} demo={demo} />
            </Paper>
          </Grid>
        )
      })}
    </div>
  )
}
