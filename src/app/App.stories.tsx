import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
    title:'appWithRedux Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}
export const AppWithReduxBAseExample = () => {
    return <App/>

}