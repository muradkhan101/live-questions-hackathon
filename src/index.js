import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    HashRouter,
    Route
  } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Attendee from './react/attendee';
import Presenter from './react/presenter';

ReactDOM.render((
    <HashRouter>
        <div>
            <Route path='/presenter' component={Presenter} />
            <Route path='/attendee' component={Attendee} />
        </div>
   </HashRouter>), document.getElementById('root'));
registerServiceWorker();
