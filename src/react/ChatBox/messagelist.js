import React from 'react';
import styled from 'styled-components';
import Message from './message';
import openSocket from 'socket.io-client';

let socket = openSocket('http://localhost:8000');
export default class MessageList extends React.Component {
    static childContextTypes = {
        socket: object
    }
    state = {
        messages: []
    }
    getChildContext() {
        return {
            socket: socket
        }
    }
    render() {
        let { messages } = this.state;
        return (
            messages.map( message => <Message data={message} key={message.id} /> )
        )
    }
}