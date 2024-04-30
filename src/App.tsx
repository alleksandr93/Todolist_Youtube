import React, {useState} from 'react';

import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
//Типизация кнопок фильтра
export type FilterValueType = 'All' | 'Completed' | 'Active'

function App() {
// Данные
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    // Локальный стейт чтобы изменять состояние
    let [filter, setFilter] = useState<FilterValueType>('All')
    const removeTask = (id: string) => {
        let filteredTasks: Array<TaskType> = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const addTack = (title:string) => {
            let newTask = {id: v1(), title: title, isDone: false}
            let newTasks = [newTask,...tasks]
            setTasks(newTasks)


    }

    let tasksForTodolist = tasks
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    } else if (filter === 'Active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      tasks={tasksForTodolist}
                      addTack={addTack}
            />

        </div>
    );
}

export default App;
