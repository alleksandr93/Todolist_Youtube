import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import {carryValue} from '@testing-library/user-event/dist/keyboard/shared';
import {log} from 'node:util';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTack: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    // Стейт где храница значения которые мы ввоим в инпут
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error,setError]=useState<string|null>(null)
    // Заисываем в стейт что что изменяем в инпуте
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTack(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if(newTaskTitle.trim() !== ''){
            props.addTack(newTaskTitle)
            setNewTaskTitle('')
        }else{
            setError('Title is required')
        }

    }
    const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')

    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div className={'wrap'}>
                <input className={error?'error':''} value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error&&<div className={'error-message'}>{error}</div>}
                <ul>
                    {props.tasks.map(t => {
                            const removeHandler = () => props.removeTask(t.id)
                            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, event.currentTarget.checked)
                            }
                            return <li className={t.isDone ? 'is-done':''} key={t.id}><input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeHandler}>x
                                </button>
                            </li>
                        }
                    )}
                </ul>
                <div className={'buttons'}>
                    <button className={props.filter === 'All' ? 'active-filter' :''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'Active' ? 'active-filter' :''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'Completed' ? 'active-filter' :''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}