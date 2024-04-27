import React, {useState} from 'react';

import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValueType = 'All' | 'Completed' | 'Active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValueType>('All')
    const removeTask = (id: number) => {
        let filteredTasks: Array<TaskType> = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
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
                      tasks={tasksForTodolist}/>

        </div>
    );
}

export default App;
