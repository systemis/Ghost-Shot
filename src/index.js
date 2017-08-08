import React    from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App      from './App';
import Store    from './Redux/index.js';
import registerServiceWorker from './registerServiceWorker';

const Router = () => {
    return(
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
