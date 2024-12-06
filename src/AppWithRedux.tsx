import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodolistAC, fetchTodolistsTС, TodolistDomainType} from './state/todolists-reduser';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {TaskType} from './api/todolists-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithRedux = memo(() => {
    useEffect(() => {
        dispatch(fetchTodolistsTС())
    }, []);
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }, [dispatch])
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={5} sx={{padding: '10px'}}>
                                <Todolist todolists={tl}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
})

export default AppWithRedux;
