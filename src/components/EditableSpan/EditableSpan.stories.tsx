import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
}
const callback = action('Vale changed')
export const EditableSpanBaseExample = () => {
  return <EditableSpan oldTitle={'hi'} onChange={callback} />
}
