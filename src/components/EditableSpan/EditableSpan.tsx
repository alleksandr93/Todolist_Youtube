import TextField from '@mui/material/TextField'
import React, { ChangeEvent, memo, useState } from 'react'

type EditableSpanPropsType = {
  oldTitle: string
  onChange: (newValue: string) => void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.oldTitle)
  }
  const deActivateEditMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField
      variant="standard"
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={deActivateEditMode}
      autoFocus
      type="text"
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>
  )
})
