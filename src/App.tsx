import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true },
        ]
    })
    const [todolists, setTodolists] = useState<Array<todolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ])
    // Локальный стейт чтобы изменять состояние
    let [filter, setFilter] = useState<FilterValueType>('All')
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasksObj[todolistId]
        setTasks({ ...tasksObj })
    }
    const removeTask = (todolistId: string, id: string) => {
        let tasks = tasksObj[todolistId]
        let filtredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filtredTasks
        setTasks({ ...tasksObj })

    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists])
    }

    const addTack = (todolistId: string, title: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({ ...tasksObj })
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let tasks = tasksObj[todolistId]
        const newTask = tasks.find(el => el.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
        }

        setTasks({ ...tasksObj })
    }
    const addTodolist = (title: string) => {
        let todolist: todolistType = { id: v1(), title, filter: 'All' }
        setTodolists([todolist, ...todolists])
        setTasks({ ...tasksObj, [todolist.id]: [] })
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newValue: string) => {
        let tasks = tasksObj[todolistId]
        const newTask = tasks.find(el => el.id === taskId)
        if (newTask) {
            newTask.title = newValue
        }

        setTasks({ ...tasksObj })
    }
    const changetodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{padding:'10px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid  container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasksObj[tl.id]
                        if (tl.filter === 'Completed') {
                            tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone)
                        } else if (tl.filter === 'Active') {
                            tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone)
                        }

                        return <Grid item>
                            <Paper elevation={5} sx={{padding:'10px'}}>
                                <Todolist
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
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
