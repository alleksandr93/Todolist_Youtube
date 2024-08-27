type Statetype = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}


export const userReduser = (state: Statetype, action: ActionType): Statetype => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = newState.age + 1
            return newState
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state,name:action.newName}
        default:
            throw new Error(`I don't understand action type`);
    }
}