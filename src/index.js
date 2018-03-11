import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LoginScreen from './react/LoginWrapper';
import ChatRoom from './react/ChatRoom';
import PresenterScreen from './react/Presenter';

const App = () => (
    <div>
        <Route path="/presenter" component={LoginScreen(PresenterScreen)}/>
        <Route exact path="/" component={LoginScreen(ChatRoom)}/>
    </div>
)

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
