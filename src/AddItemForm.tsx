import  TextField  from '@mui/material/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import  ControlPoint  from '@mui/icons-material/ControlPoint';
import  IconButton  from '@mui/material/IconButton';

type AddItemFromPropsType = {
    addItem: (todolistId: string) => void

}
export const AddItemForm = memo((props: AddItemFromPropsType) => {
    console.log('AddItemForm is called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
         setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){
            setError(null)
        }
        if (e.charCode === 13) {
            props.addItem(title)
            setTitle('')
        }

    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div>
        <TextField size='small' label={!error ? 'Enter value' :'error'} variant='outlined' error={!!error} value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler} />
        <IconButton  onClick={addTask} color='primary'>
            <ControlPoint/>
        </IconButton>
        {error && <div className={'error-message'}>{error}</div>}</div>
})