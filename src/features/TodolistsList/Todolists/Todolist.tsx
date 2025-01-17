import React, { memo, useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from '../../../app/store'
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType,
} from '../todolists-reduser'
import { addTaskTC } from '../tasks-reduser'
import { TaskStatuses } from '../../../api/todolists-api'
import { TaskStateType } from '../../../app/App'
import { Task } from './Task/Task'

type PropsType = {
  todolists: TodolistDomainType
  demo?: boolean
}

export const Todolist = memo(({ demo = false, ...props }: PropsType) => {
  const { id, title, filter, entityStatus } = props.todolists
  const dispatch = useDispatch()
  useEffect(() => {
    if (demo) {
      return
    }
  }, [])
  const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
  let tasksForTodolist = tasks[id]
  if (filter === 'Completed') {
    tasksForTodolist = tasksForTodolist.filter(tl => tl.status === TaskStatuses.Completed)
  } else if (filter === 'Active') {
    tasksForTodolist = tasksForTodolist.filter(tl => tl.status === TaskStatuses.New)
  }
  const changeFilter = useCallback(
    (value: FilterValueType) => {
      const action = changeTodolistFilterAC({ id, filter: value })
      dispatch(action)
    },
    [dispatch, id],
  )
  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistTC(id))
  }, [])
  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(props.todolists.id, title))
  }, [])

  const changetodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleTC(id, newTitle))
    },
    [dispatch, id],
  )

  return (
    <div className={'todolist'}>
      <h3>
        <EditableSpan oldTitle={title} onChange={changetodolistTitle} />
        <IconButton
          aria-label="delete"
          size="small"
          onClick={removeTodolistHandler}
          disabled={entityStatus === 'loading'}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
      <div className={'wrap'}>
        <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'} />
        <div>
          {tasksForTodolist.map(t => {
            return <Task key={t.id} task={t} todolist={props.todolists} />
          })}
        </div>
        <div className={'buttons'}>
          <Button variant={filter === 'All' ? 'contained' : 'outlined'} onClick={() => changeFilter('All')}>
            All
          </Button>
          <Button
            color="primary"
            variant={filter === 'Active' ? 'contained' : 'outlined'}
            onClick={() => changeFilter('Active')}
          >
            Active
          </Button>
          <Button
            color="secondary"
            variant={filter === 'Completed' ? 'contained' : 'outlined'}
            onClick={() => changeFilter('Completed')}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  )
})
