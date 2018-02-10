import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LoginScreen from './react/login';

ReactDOM.render(<LoginScreen />, document.getElementById('root'));
registerServiceWorker();
