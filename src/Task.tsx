import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reduser';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from './api/todolists-api';

type PropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo((props: PropsType) => {
    const dispatch = useDispatch();
    const removeHandler = useCallback(() => {
        const action = removeTaskAC(props.todolistId, props.task.id)
        dispatch(action)
    }, [dispatch, props.todolistId, props.task.id])
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.checked)
        const action = changeTaskStatusAC(props.todolistId, props.task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        dispatch(action)
    }, [dispatch, props.todolistId, props.task.id])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        const action = changeTaskTitleAC(props.todolistId, props.task.id, newValue)
        dispatch(action)
    }, [dispatch, props.todolistId, props.task.id])

    return <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''} key={props.task.id}>
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.status === TaskStatuses.Completed} color="primary"/>
        <EditableSpan oldTitle={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" size="small" onClick={removeHandler}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
    </div>
})

