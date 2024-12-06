import {applyMiddleware, combineReducers, createStore,} from 'redux';
import {tasksReduser} from './tasks-reduser';
import {todolistsReducer} from './todolists-reduser';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReduser
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))// 2 аргумент чтобы thunk работал

// @ts-ignore
window.store = store