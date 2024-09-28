import React, { ChangeEvent } from 'react';

import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {FilterValueType, TaskStateType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reduser';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reduser';


type PropsType = {
    title: string
    filter: FilterValueType
    todolistId: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState,TaskStateType>(state => state.tasks)

    let tasksForTodolist = tasks[props.todolistId]
    if (props.filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone)
    } else if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone)
    }
    const changeFilter = ( value: FilterValueType) => {
        const action = changeTodolistFilterAC(props.todolistId, value)
        dispatch(action)
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(props.todolistId))
    }

    const addTask = (title: string) => {
        const action = addTaskAC(props.todolistId, title)
        dispatch(action)
    }
    const changetodolistTitle = (newTitle: string) => {
        const action = changeTodolistTitleAC(props.todolistId, newTitle)
        dispatch(action)
    }
    return (
        <div className={'todolist'}>
            <h3> <EditableSpan oldTitle={props.title} onChange={changetodolistTitle} />
                <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <div className={'wrap'}>
                <AddItemForm addItem={addTask} />
                <div>
                    {tasksForTodolist.map(t => {
                        const removeHandler = () => {
                            const action = removeTaskAC(props.todolistId, t.id)
                            dispatch(action)
                        }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const action = changeTaskStatusAC(props.todolistId, t.id, event.currentTarget.checked)
                            dispatch(action)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            const action = changeTaskTitleAC(props.todolistId, t.id, newValue)
                            dispatch(action)
                        }
                        return <div className={t.isDone ? 'is-done' : ''} key={t.id}>
                            <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} color='primary'/>
                            <EditableSpan oldTitle={t.title} onChange={onChangeTitleHandler} />
                            <IconButton aria-label="delete" size="small" onClick={removeHandler}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    }
                    )}
                </div>
                <div className={'buttons'}>
                    <Button variant={props.filter === 'All' ? 'contained':'outlined'} onClick={()=>changeFilter('All')}>All</Button>
                    <Button color='primary' variant={props.filter === 'Active'? 'contained':'outlined' } onClick={()=>changeFilter('Active')}>Active</Button>
                    <Button color='secondary' variant={props.filter === 'Completed'? 'contained':'outlined' }onClick={()=>changeFilter('Completed')}>Completed</Button>
                
                </div>
            </div>
        </div>
    )
}
