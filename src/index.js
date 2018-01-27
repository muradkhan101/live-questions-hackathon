import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Message from './react/ChatBox/message';
// import socket from 'socket.io-client';



ReactDOM.render(<Message
    data={{
        message: 'What am I doing here?',
        name: 'Rami Malek',
        timestamp: Date.now(),
        score: 12,
        id: 1,
        children: [
            {
                message: 'What am I doing here?',
                name: 'Rami Malek',
                timestamp: Date.now(),
                score: 12,
                id: 1,
            }
        ]
    }}
    />, document.getElementById('root'));
registerServiceWorker();
