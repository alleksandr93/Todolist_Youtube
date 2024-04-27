import React from 'react';

import './App.css';
import {TaskType, Todolist} from './Todolist';


function App() {
    let task1: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redax', isDone: false},
    ]
    let task2: Array<TaskType> = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task1}/>
            <Todolist title={'Movies'} tasks={task2}/>
        </div>
    );
}

export default App;
