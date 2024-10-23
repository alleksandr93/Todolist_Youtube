import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title:'appWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}
export const AppWithReduxBAseExample = () => {
    return <AppWithRedux/>

}