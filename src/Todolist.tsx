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

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    // Стейт где храница значения которые мы ввоим в инпут
    const [newTaskTitle, setNewTaskTitle] = useState('')
    // Заисываем в стейт что что изменяем в инпуте
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTack(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTack(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')
    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div className={'wrap'}>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                <ul>
                    {props.tasks.map(t => {
                            const removeHandler = () => props.removeTask(t.id)
                            return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeHandler}>x
                                </button>
                            </li>
                        }
                    )}
                </ul>
                <div className={'buttons'}>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}