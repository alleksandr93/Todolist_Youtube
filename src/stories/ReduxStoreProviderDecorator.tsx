import {Provider} from 'react-redux';
import {AppRootState} from '../state/store';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReduser} from '../state/tasks-reduser';
import {todolistsReducer} from '../state/todolists-reduser';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReduser
})

const initialGlobaleState = {
    todolists: [
        {id: 'todolistsId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistsId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistsId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'js', isDone: true},
        ],
        ['todolistsId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: true},
        ]
    }
}
// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobaleState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}