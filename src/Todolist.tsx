import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {FilterValueType, TaskStateType, TodolistType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reduser';
import {addTaskAC} from './state/tasks-reduser';
import {Task} from './Tasks';


type PropsType = {
    todolists: TodolistType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = memo((props: PropsType) => {
    const {id,title,filter}=props.todolists

    console.log('Todolist is called')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    let tasksForTodolist = tasks[id]
    if (filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone)
    } else if (filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone)
    }
    const changeFilter = useCallback((value: FilterValueType) => {
        const action = changeTodolistFilterAC(id, value)
        dispatch(action)
    }, [dispatch,id])
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id))
    },[dispatch,id])
    const addTask = useCallback((title: string) => {
        const action = addTaskAC(id, title)
        dispatch(action)
    }, [dispatch, id, title])
    const changetodolistTitle = useCallback((newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch, id])


    return (
        <div className={'todolist'}>
            <h3><EditableSpan oldTitle={title} onChange={changetodolistTitle}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <div className={'wrap'}>
                <AddItemForm addItem={addTask}/>
                <div>
                    {tasksForTodolist.map(t => {
                            return <Task key={t.id} task={t} todolistId={id}/>
                        }
                    )}
                </div>
                <div className={'buttons'}>
                    <Button variant={filter === 'All' ? 'contained' : 'outlined'}
                            onClick={() => changeFilter('All')}>All</Button>
                    <Button color="primary" variant={filter === 'Active' ? 'contained' : 'outlined'}
                            onClick={() => changeFilter('Active')}>Active</Button>
                    <Button color="secondary" variant={filter === 'Completed' ? 'contained' : 'outlined'}
                            onClick={() => changeFilter('Completed')}>Completed</Button>

                </div>
            </div>
        </div>
    )
})
