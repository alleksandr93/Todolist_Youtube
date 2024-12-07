import {TaskStateType} from '../../app/App';
import {addTaskAC, removeTaskAC, setTasksAC, tasksReduser, updateTaskAC} from './tasks-reduser';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reduser';
import {TaskStatuses, TodoTaskPriorities} from '../../api/todolists-api';
import {v1} from 'uuid';

let startState: TaskStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                completed: true,
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                completed: true,
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                completed: true,
                order: 0,
                priority: TodoTaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'Book',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                completed: true,
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: '2',
                title: 'Tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                completed: true,
                order: 0,
                priority: TodoTaskPriorities.Low
            },
        ]
    }
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')

})
test('correct task should be added to correct array', () => {


    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status:TaskStatuses.New,
        addedDate:'',
        deadline:'',
        description:'',
        order:0,
        priority:0,
        startDate:'',
        id:'NewId',
        completed:true,
    })
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)

})
test('status of specified task should be changed', () => {


    const action = updateTaskAC({todolistId:'todolistId2',taskId:'2',model:{status:TaskStatuses.New}})
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})
test('title of specified task should be changed', () => {


    const action = updateTaskAC({todolistId:'todolistId2',taskId:'2',model:{title:"Milkyway"}})
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkyway')
    expect(endState['todolistId1'][1].title).toBe('JS')
})
test('new property with array should be added when new todolist is added', () => {


    const action = addTodolistAC({
        id:v1(),
        title:'Title',
        order:0,
        addedDate:''
    })
    const endState = tasksReduser(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test(' property with todolistID should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReduser(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
test('empty arrays should be added when set Todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0},
    ])
    const endState = tasksReduser({}, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {
    const action = setTasksAC('todolistId1', startState['todolistId1'])
    const endState = tasksReduser({}, action)

    expect(endState['todolistId1'].length).toBe(3)

})

