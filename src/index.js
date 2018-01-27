import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from './react/main';
import Attendee from './react/attendee';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/presenter' component={presenter} />
        <Route path='/attendee' component={Attendee} />
   </Router>), document.getElementById('root'));
registerServiceWorker();
