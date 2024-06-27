import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title,setTitle]=useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.oldTitle)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler=(e: ChangeEvent<HTMLInputElement>)=>{
       setTitle(e.currentTarget.value)
    }

    return editMode ? <input value={title} onChange={onChangeTitleHandler} onBlur={deActivateEditMode} autoFocus type="text"/>
        : <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>
}
