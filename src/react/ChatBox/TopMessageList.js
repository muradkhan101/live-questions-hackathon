import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import Message from './Message';
import MiniTitle from '../Profile/MiniTitle';
let MessageContainer = styled.div`
    flex-grow: 1;
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    box-shadow: 0px 1px 2px gray;
`

export default class TopMessageList extends React.Component {
    static contextTypes = {
        scores: object
    }
    render() {
        let { messages, replies } = this.props;
        let { scores } = this.context;
        return (
            <MessageContainer>
                <MiniTitle name={"Top Questions"} />
                {messages.slice().sort((a, b) => scores[a.id] < scores[b.id] ? 1 : -1)
                    .filter( (x, i) => i < 2)
                    .map(message => <Message
                        replies={replies[message.id]}
                        data={message} key={message.id} />)}
            </MessageContainer>
        )
    }
}