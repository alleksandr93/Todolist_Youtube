import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { ChangeEvent, memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { removeTaskTC, updateTaskTC } from '../../tasks-reduser'

type PropsType = {
  task: TaskType
  todolistId: string
}
export const Task = memo((props: PropsType) => {
  const dispatch = useDispatch()

  const removeHandler = useCallback(() => {
    dispatch(removeTaskTC(props.todolistId, props.task.id))
  }, [])

  const onChangeStatusHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskTC(props.todolistId, props.task.id, {
          status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        }),
      )
    },
    [dispatch, props.todolistId, props.task.id],
  )
  const onChangeTitleHandler = useCallback((newValue: string) => {
    dispatch(updateTaskTC(props.todolistId, props.task.id, { title: newValue }))
  }, [])

  return (
    <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''} key={props.task.id}>
      <Checkbox
        onChange={onChangeStatusHandler}
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
      />
      <EditableSpan oldTitle={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" size="small" onClick={removeHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
})
