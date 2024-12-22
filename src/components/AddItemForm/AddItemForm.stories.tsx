import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Add Item Form',
  component: AddItemForm,
}
const callback = action('Button add was pressed inside the form ')
export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={title => callback(title)} />
}
export const AddItemFormDisabledExample = () => {
  return <AddItemForm disabled={true} addItem={title => callback(title)} />
}
