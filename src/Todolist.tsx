import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changetodolistTitle: (todolistId: string, newTitle: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'All')
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'Active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'Completed')
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        debugger
        props.addTask(props.todolistId, title)
    }
    const changetodolistTitle = (newTitle: string) => {
        props.changetodolistTitle(props.todolistId, newTitle)
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
                    {props.tasks.map(t => {
                        const removeHandler = () => props.removeTask(props.todolistId, t.id)
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.todolistId, t.id, event.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.todolistId, t.id, newValue)
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
                    <Button variant={props.filter === 'All' ? 'contained':'outlined'} onClick={onAllClickHandler}>All</Button>
                    <Button color='primary' variant={props.filter === 'Active'? 'contained':'outlined' } onClick={onActiveClickHandler}>Active</Button>
                    <Button color='secondary' variant={props.filter === 'Completed'? 'contained':'outlined' }onClick={onCompletedClickHandler}>Completed</Button>
                
                </div>
            </div>
        </div>
    )
}
