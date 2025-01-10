import { appReducer, type InitialStateType, setAppErrorAC, setAppStatusAC, type RequestStatusType } from './app-reducer'

let startState: InitialStateType
beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('correct error message should be set', () => {
  const error = 'Some Error'
  const endState = appReducer(startState, setAppErrorAC(error))

  expect(endState.error).toBe(error)
  expect(endState.status).toBe('idle')
})
test('correct status should be set', () => {
  const status: RequestStatusType = 'loading'
  const endState = appReducer(startState, setAppStatusAC(status))

  expect(endState.error).toBe(null)
  expect(endState.status).toBe(status)
})
