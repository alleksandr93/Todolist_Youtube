import { useSelector } from 'react-redux'
import { AppRootState } from '../../../../app/store'
import { TaskStateType } from '../../../../app/App'
import { BrowserRouterDecorator } from '../../../../stories/BrowserRouterDecorator'
import { TaskStatuses, TodoTaskPriorities } from '../../../../api/todolists-api'
import { Task } from './Task'

export default {
  title: 'Task Component',
  component: Task,
  decorators: [BrowserRouterDecorator],
}
export const TaskBaseExample = () => {
  const task = useSelector<AppRootState, TaskStateType>(state => state.tasks)
  return (
    <Task
      task={{
        id: 'todolistID1',
        title: 'css',
        status: TaskStatuses.New,
        todoListId: 'todolistID1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        completed: true,
        order: 0,
        priority: TodoTaskPriorities.Low,
      }}
      todolist={{
        id: 'todolistID1',
        title: 'What to learn',
        entityStatus: 'idle',
        filter: 'All',
        addedDate: '',
        order: 0,
      }}
    />
  )
}
