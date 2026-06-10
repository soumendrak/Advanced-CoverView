import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

// Register the service worker to make the app installable and offline-capable.
serviceWorkerRegistration.register();
