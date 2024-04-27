import React from 'react';
import {log} from 'node:util';

type PropsType = {
    title: string
    tasks: Array<TaskType>
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
                    {props.tasks.map(t=> <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>{alert(t.id)}}>x</button>
                    </li>
                    )}
                </ul>
                <div className={'buttons'}>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}