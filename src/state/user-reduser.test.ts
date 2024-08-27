import {userReduser} from './user-reduser';


test('user reducer should increment only age', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }
    const endState = userReduser(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})
test('user reducer should decrement only childrenCount', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Dimych'};
    const endState = userReduser(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)

})
test('user reducer should decrement only user', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Dimych'};
    const newState = 'Viktor'
    const endState = userReduser(startState, {type: 'CHANGE-NAME', newName:newState})
    expect(endState.name).toBe(newState)

})