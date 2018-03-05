import React from 'react';
import styled from 'styled-components';
import { object, string, array } from 'prop-types';

import MessageList from './ChatBox/messagelist';
import TopMessageList from './ChatBox/topmessagelist';
import Header from './header';
import MessageBox from './ChatBox/messagebox';
import MiniTitle from './Profile/minititle';

import { BASEURL } from '../shared/constants';
import fetch from 'node-fetch';

import ViewingCanvas from './canvas/viewing-canvas';

import SocketWrapper from './socketWrapper';

let Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

let Container = styled.div`
    display: flex;
    flex-direction: column;
`
let StickToBottom = styled.div`
    position: fixed;
    bottom: 8px;
    width: 100%;
`
class Main extends React.Component {
    static contextTypes = {
        socket: object,
        messages: array,
        replies: object,
        scores: object,
        room: string,
    }
    static childContextTypes = {
        name: string
    }
    state = {
        context: '',
        name: '',
    }
    getChildContext() {
        return {
            name: this.state.name
        }
    }
    shouldComponentUpdate() { return true; }
    question(data) {
        let requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        requestOptions.body = this.state.context
            ?  JSON.stringify({
                message: data.message,
                context: this.state.context,
            }) : JSON.stringify({ message: data.message });

        fetch(`${BASEURL}/conversation`, requestOptions)
        .then( res => res.json())
        .then(response => {
            this.setState({
                context: response.context
            })
        })
        this.context.socket.emit('message', data, this.context.room);
    }
    login({message}) {
        this.setState({
            name: message,
        });
    }

    messageCheck(key) {
        if (key === 13 && this.state.message !== '') {
            this.props.onSubmit({
                message: this.state.message,
                name: this.context.name,
                timestamp: Date.now()
            })
            this.state.message = '';
        }
    }
    render() {
        let { messages, replies } = this.context;
        return (
            <Container>
                <Header event={this.props.room}/>
                { messages.length > 4 ? <TopMessageList messages={messages} replies={replies} /> : null }
                <Flex>
                    <MessageList messages={messages} replies={replies} />
                    <ViewingCanvas />
                </Flex>
                { 
                    this.state.name !== ''
                    ? <span style={{'marginBottom': '50px'}}>
                        <StickToBottom>
                            <MessageBox checkKeypress={this.messageCheck}  placeholder={"Ask a question"} onSubmit={(data) => this.question(data)} />
                        </StickToBottom>
                     </span>
                    : <StickToBottom>
                        <MiniTitle style={{'marginLeft': '24px'}} name={"Log-in to ask a question!"} />
                        <MessageBox checkKeypress={this.messageCheck} placeholder={"Choose a username!"} onSubmit={(data) => this.login(data)} />
                    </StickToBottom>
                }
            </Container>
        )
    }
}

export default SocketWrapper(Main);
