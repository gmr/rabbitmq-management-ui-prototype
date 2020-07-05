import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './sass/custom.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './i18n';
import 'bootstrap';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="loading">
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
