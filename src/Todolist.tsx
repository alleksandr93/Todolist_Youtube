import React from 'react';
import {FilterValueType} from './App';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void

}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div className={'wrap'}>
                <input/>
                <button>+</button>
                <ul>
                    {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>x
                            </button>
                        </li>
                    )}
                </ul>
                <div className={'buttons'}>
                    <button onClick={()=>props.changeFilter('All')}>All</button>
                    <button onClick={()=>props.changeFilter('Active')}>Active</button>
                    <button onClick={()=>props.changeFilter('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}