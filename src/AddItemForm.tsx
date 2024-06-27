import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFromPropsType = {
    addItem: (todolistId: string) => void

}
export const AddItemForm = (props: AddItemFromPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem( title)
            setTitle('')
        }
    }
    const addTask = () => {
        debugger
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div>
        <input className={error ? 'error' : ''} value={title} onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}</div>
}