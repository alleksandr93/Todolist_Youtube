import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {memo, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {TaskType} from '../api/todolists-api';
import './App.css';
import {AppRootState} from './store';
import {addTodolistTC, fetchTodolistsTС, TodolistDomainType} from '../features/TodolistsList/todolists-reduser';
import {Todolist} from '../features/TodolistsList/Todolists/Todolist';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


export const App = memo(() => {
    useEffect(() => {
        dispatch(fetchTodolistsTС())
    }, []);
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])
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

export default App;
