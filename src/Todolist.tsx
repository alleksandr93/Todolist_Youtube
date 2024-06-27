import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
    changetodolistTitle:(todolistId: string,newTitle: string)=>void

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
    const changetodolistTitle=(newTitle:string)=>{
props.changetodolistTitle(props.todolistId,newTitle)
    }
    return (
        <div className={'todolist'}>
            <h3> <EditableSpan oldTitle={props.title} onChange={changetodolistTitle}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div className={'wrap'}>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.tasks.map(t => {
                            const removeHandler = () => props.removeTask(props.todolistId, t.id)
                            const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(props.todolistId, t.id, event.currentTarget.checked)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(props.todolistId, t.id, newValue)
                            }
                            return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan oldTitle={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={removeHandler}>x
                                </button>
                            </li>
                        }
                    )}
                </ul>
                <div className={'buttons'}>
                    <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'Active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
