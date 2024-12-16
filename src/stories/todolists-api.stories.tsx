import { useEffect, useState } from 'react'
import { TaskType, todolistsApi, TodolistType } from '../api/todolists-api'

export default {
  title: 'Todolist API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<TodolistType[]>()
  const onClickHandler = () => {
    todolistsApi.getTodolistAPI().then(res => {
      console.log(res.data)
      setState(res.data)
    })
  }
  return (
    <>
      <button onClick={onClickHandler}>Поулчить Список</button>
      <div>Количество тудулистов у меня:{state?.length}</div>
      {state?.map(item => {
        return (
          <table>
            <tr>
              <th>
                <b style={{ color: 'green' }}>Title:</b> {item.title}
              </th>
            </tr>
            <tr>
              <td>
                <b style={{ color: 'green' }}>Id:</b> {item.id}
              </td>
            </tr>
          </table>
        )
      })}
    </>
  )
}
export const CreateTodolists = () => {
  const [title, setTitle] = useState('')
  const [state, setState] = useState<null | string>(null)
  const onClickHander = () => {
    todolistsApi.createTodolistAPI(title).then(res => {
      console.log(res)
      setState('Тудулист создан')
    })
    setTitle('')
  }
  return (
    <div>
      <input type="text" placeholder={'Введите текст'} onChange={e => setTitle(e.currentTarget.value)} />
      <button onClick={onClickHander}>Создать тудулист</button>
      <h1>{state}</h1>
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<TodolistType[]>([])
  const [value, setValue] = useState<null | string>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const onClickHandler = () => {
    todolistsApi.deleteTodolistAPI(todolistId).then(res => {
      console.log(res)
      setValue('Тудулист удален')
    })
  }
  useEffect(() => {
    todolistsApi.getTodolistAPI().then(res => {
      if (res.data.length === 0) {
        setValue('Тудулистов нет')
      } else {
        setState(res.data)
      }
    })
  }, [])
  return (
    <>
      <input
        type="text"
        placeholder={'введите иди того тудулиста которого хотите удалить'}
        onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={onClickHandler}>Удалить тудулист</button>
      <div>
        <h4>Список тудулистов:</h4>
        {!!value
          ? value
          : state?.map(item => {
              return (
                <table>
                  <tr>
                    <b style={{ color: 'green' }}>Title:</b>
                    <th> {item.title}</th>
                  </tr>
                  <tr>
                    <b style={{ color: 'green' }}>Id:</b>
                    <td> {item.id}</td>
                  </tr>
                </table>
              )
            })}
      </div>
    </>
  )
}
export const UpdateTodolist = () => {
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [value, setValue] = useState<null | string>(null)
  const [state, setState] = useState<TodolistType[]>([])
  useEffect(() => {
    todolistsApi.getTodolistAPI().then(res => {
      if (res.data.length === 0) {
        setValue('Тудулистов нет')
      } else {
        setState(res.data)
      }
    })
  }, [])
  const onClickHandler = () => {
    todolistsApi.updateTodolistAPI(todolistId, title).then(res => {
      console.log(res)
      setValue('Тудулист изменен')
    })
  }
  const styleIut = {
    padding: '2px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '5px',
  }
  return (
    <>
      <input
        style={styleIut}
        type="text"
        placeholder={'Введите id тудулиста который вы хотите удалить'}
        onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input
        style={styleIut}
        type="text"
        placeholder={'Введите текст чтобы изменить титл'}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={onClickHandler}>Изменить тудулист</button>
      <h3>Список тудулистов:</h3>
      {!!value
        ? value
        : state?.map(item => {
            return (
              <table>
                <tr>
                  <b style={{ color: 'green' }}>Title:</b>
                  <th> {item.title}</th>
                </tr>
                <tr>
                  <b style={{ color: 'green' }}>Id:</b>
                  <td> {item.id}</td>
                </tr>
              </table>
            )
          })}
    </>
  )
}

export const GetTasks = () => {
  const [todolistId, setTodolistId] = useState<string>('')
  const [state, setState] = useState<TaskType[]>([])
  const onClickHandler = () => {
    todolistsApi.getTasks(todolistId).then(res => {
      setState(res.data.items)
    })
  }
  return (
    <>
      <input
        type="text"
        placeholder={'Введите ид тудулиста чтобы получить таски'}
        onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={onClickHandler}>Дай Таски</button>
      {state.map(task => (
        <p>{task.title}</p>
      ))}
    </>
  )
}
export const CreateTasks = () => {
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [value, setValue] = useState<null | string>(null)
  const onClickHandler = () => {
    todolistsApi.createTask(todolistId, taskTitle).then(res => {
      console.log(res)
      setValue('Таска создана')
    })
  }
  return (
    <>
      <input type="text" placeholder={'Введите ид тудулиста'} onChange={e => setTodolistId(e.currentTarget.value)} />
      <input type="text" placeholder={'Введите титлу'} onChange={e => setTaskTitle(e.currentTarget.value)} />
      <button onClick={onClickHandler}>Создать таску</button>
      <h3>{value}</h3>
    </>
  )
}
export const DeleteTasks = () => {
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [state, setState] = useState<TaskType[]>([])
  const [value, setValue] = useState<null | string>(null)
  const onClickHandler = () => {
    todolistsApi.getTasks(todolistId).then(res => {
      setState(res.data.items)
    })
  }
  const onclickDeleteHandler = () => {
    if (todolistId.length !== 0) {
      todolistsApi.deleteTask(todolistId, taskId).then(res => {
        console.log(res)
        setValue('Таска удалена')
      })
    }
  }
  return (
    <>
      <input type="text" placeholder={'Введите тудулист'} onChange={e => setTodolistId(e.currentTarget.value)} />
      <button onClick={onClickHandler}>Получить тудулисты</button>
      <div>
        <input type="text" placeholder={'Введите ид таски'} onChange={e => setTaskId(e.currentTarget.value)} />
        <button onClick={onclickDeleteHandler}>Удалить Таску</button>
      </div>

      {value
        ? value
        : state.map(item => {
            return (
              <table>
                <tr>
                  <th>
                    <b style={{ color: 'green' }}>Title:</b> {item.title}
                  </th>
                </tr>
                <tr>
                  <td>
                    <b style={{ color: 'green' }}>Id:</b> {item.id}
                  </td>
                </tr>
              </table>
            )
          })}
    </>
  )
}
export const UpdateTasks = () => {
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [state, setState] = useState<TaskType[]>([])
  const [value, setValue] = useState<null | string>(null)
  const [title, setTitle] = useState<string>('')

  const getTodolistHandler = () => {
    todolistsApi.getTasks(todolistId).then(res => {
      console.log(res.data.items)
      setState(res.data.items)
    })
  }
  const changeTaskHandler = () => {
    const { description, completed, status, priority, startDate, deadline } = state.filter(
      item => item.id === taskId,
    )[0]
    todolistsApi
      .updateTask(todolistId, taskId, {
        title,
        description,
        completed,
        status,
        priority,
        startDate,
        deadline,
      })
      .then(res => {
        setValue('Все изменилось')
      })
  }

  return (
    <>
      <div>
        <input type="text" placeholder={'Введите Тудулист Ид'} onChange={e => setTodolistId(e.currentTarget.value)} />
        <button onClick={getTodolistHandler}>Get Todolists</button>
      </div>
      <div>
        <input type="text" placeholder={'Введите Таск Ид'} onChange={e => setTaskId(e.currentTarget.value)} />
        <input type="text" placeholder={'Измени заголовок'} onChange={e => setTitle(e.currentTarget.value)} />
        <button onClick={changeTaskHandler}>Change Tasks</button>
      </div>
      {value
        ? value
        : state.map(item => {
            return (
              <table>
                <tr>
                  <th>
                    <b style={{ color: 'green' }}>Title:</b> {item.title}
                  </th>
                </tr>
                <tr>
                  <td>
                    <b style={{ color: 'green' }}>Id:</b> {item.id}
                  </td>
                </tr>
              </table>
            )
          })}
    </>
  )
}
