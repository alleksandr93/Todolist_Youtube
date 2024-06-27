import React, {useState} from 'react';

import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
//Типизация кнопок фильтра
export type FilterValueType = 'All' | 'Completed' | 'Active'
export type todolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
// IdTodolists
    const todolistId1 = v1()
    const todolistId2 = v1()
    // Данные
    const [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })
    const [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])
    // Локальный стейт чтобы изменять состояние
    let [filter, setFilter] = useState<FilterValueType>('All')
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    const removeTask = (todolistId: string, id: string) => {
        let tasks = tasksObj[todolistId]
        let filtredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filtredTasks
        setTasks({...tasksObj})

    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists])
    }

    const addTack = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let tasks = tasksObj[todolistId]
        const newTask = tasks.find(el => el.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
        }

        setTasks({...tasksObj})
    }
    const addTodolist = (title: string) => {
        let todolist: todolistType = {id: v1(), title, filter: 'All'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }
    const changeTaskTitle=(todolistId: string, taskId: string, newValue: string)=>{
        let tasks = tasksObj[todolistId]
        const newTask = tasks.find(el => el.id === taskId)
        if (newTask) {
            newTask.title = newValue
        }

        setTasks({...tasksObj})
    }
    const changetodolistTitle=(todolistId: string,newTitle: string)=>{
        const todolist =todolists.find(tl=>tl.id===todolistId)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'Completed') {
                    tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone)
                } else if (tl.filter === 'Active') {
                    tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone)
                }

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    tasks={tasksForTodolist}
                    addTask={addTack}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changetodolistTitle={changetodolistTitle}

                />
            })}


        </div>
    );
}

export default App;
