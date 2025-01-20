import App from './App'
import { BrowserRouterDecorator } from '../stories/BrowserRouterDecorator'
import StoryRouter from 'storybook-react-router'

export default {
  title: 'appWithRedux Component',
  component: App,
  decorators: [BrowserRouterDecorator],
}
export const AppWithReduxBAseExample = () => {
  return <App demo={true} />
}
