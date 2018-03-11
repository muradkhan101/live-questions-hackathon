import React from 'react';
import styled from 'styled-components';
import { object, string, func, array } from 'prop-types';
import openSocket from 'socket.io-client';
import {HashRouter, Route} from 'react-router-dom';
import fetch from 'node-fetch';
import Attendee from './Attendee';
import Presenter from './Presenter';
import { BASEURL } from '../shared/constants';

export default class Home extends React.Component {
    static childContextTypes = {
        socket: object,
        name: string,
        scores: object,
        messages: array,
        replies: object,
        question: func,
        login: func
    }
    state = {
        socket: undefined,
        messages: [],
        replies: {}, // Maps message id to array of replies
        scores: {}, // Maps message + reply ids to score
        name: '',
        context: '',
    }

    componentDidMount() {
        this.state.socket = openSocket('http://localhost:8001');

        this.state.socket.on('new message', (message) => {
            this.setState({messages: [...this.state.messages, message]})
            this.state.scores[message.id] = 0;
        })
        this.state.socket.on('new reply', ({ replyId, reply }) => {
            let repliesForMessage = this.state.replies[replyId];
            let newReplyArray = repliesForMessage ? repliesForMessage : [];
            this.state.scores[reply.id] = 0;
            this.setState({
                replies: Object.assign( {}, this.state.replies, {[replyId]: [...newReplyArray, reply]})
            })
        })
        this.state.socket.on('score update', (update) => {
        this.setState({
            scores: Object.assign({}, this.state.scores,
                {[update.id]: update.score})
        })
        })

        this.state.socket.on('initial data', (messages) => {
            
        })
    }
    getChildContext() {
        return {
            socket: this.state.socket,
            name: this.state.name,
            scores: this.state.scores,
            messages: this.state.messages,
            replies: this.state.replies,
            question: (data) => this.question(data),
            login: (message) => this.login(message)
        }
    }
    question(data) {
        fetch(`${BASEURL}/conversation`,{
            method: 'post',
            body: JSON.stringify({
                message: data.message,
                context: this.state.context,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => res.json())
        .then(response => {
            this.setState({
                context: response.context
            })
        })
        this.state.socket.emit('message', data);
    }
    login({message}) {
        this.setState({
            name: message,
        });
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path='/presenter' component={Presenter} />
                    <Route path='/attendee' component={Attendee} />
                </div>
            </HashRouter>
        )
    }
}