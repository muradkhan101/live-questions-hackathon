import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LoginScreen from './react/login';
import ChatRoom from './react/ChatRoom';
import PresenterScreen from './react/presenter';

const App = () => (
    <div>
        <Route path="/presenter" component={LoginScreen(PresenterScreen)}/>
        <Route exact path="/" component={LoginScreen(ChatRoom)}/>
    </div>
)

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
