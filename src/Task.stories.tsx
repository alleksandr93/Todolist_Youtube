import {Task} from './Task';
import {useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {TaskStateType} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}
export const TaskBaseExample = () => {
const task = useSelector<AppRootState,TaskStateType>(state => state.tasks)
    return <Task task={{id:'todolistID1',title:'css',isDone:false}} todolistId={'todolistsId1'}/>





}