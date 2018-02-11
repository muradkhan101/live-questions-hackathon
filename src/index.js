import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomeComponent from './react/home';
import registerServiceWorker from './registerServiceWorker';
<<<<<<< HEAD
import LoginScreen from './react/login';
||||||| merged common ancestors
import Main from './react/main';
=======
>>>>>>> routes

<<<<<<< HEAD
ReactDOM.render(<LoginScreen />, document.getElementById('root'));
||||||| merged common ancestors
ReactDOM.render(<Main />, document.getElementById('root'));
=======
ReactDOM.render((
   <HomeComponent/> ), document.getElementById('root'));
>>>>>>> routes
registerServiceWorker();
