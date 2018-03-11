import openSocket from 'socket.io-client';
import React from 'react';
import { object, string, array } from 'prop-types';

export default function SocketWrapper(Comp) {
    return class SocketWrapperComponent extends React.Component {
        static childContextTypes = {
            socket: object,
            messages: array,
            replies: object,
            scores: object,
            room: string,
        }
        state = {
            socket: undefined,
            messages: [],
            replies: {}, // Maps message id to array of replies
            scores: {}, // Maps message + reply ids to score
            context: '',
        }

        componentWillMount() {
            this.state.socket = openSocket('http://localhost:5000');

            this.state.socket.on('new message', (message) => {
                this.setState({ messages: [...this.state.messages, message] })
                this.state.scores[message.id] = 0;
            })
            this.state.socket.on('new reply', ({ replyId, reply }) => {
                let repliesForMessage = this.state.replies[replyId];
                let newReplyArray = repliesForMessage ? repliesForMessage : [];
                this.state.scores[reply.id] = 0;
                this.setState({
                    replies: Object.assign({}, this.state.replies, { [replyId]: [...newReplyArray, reply] })
                })
            })
            this.state.socket.on('score update', (update) => {
                this.setState({
                    scores: Object.assign({}, this.state.scores,
                        { [update.id]: update.score })
                })
            })

            this.state.socket.on('initial data', (messages) => {

            })

            this.state.socket.emit('subscribe', this.props.room);
        }
        getChildContext() {
            return {
                socket: this.state.socket,
                messages: this.state.messages,
                scores: this.state.scores,
                replies: this.state.replies,
                room: this.props.room || Math.floor(Math.random() * 100000),
            }
        }
        render() {
            return (
                <Comp 
                    {...this.props}
                    {...this.state}
                />
            )
        }
    }
}