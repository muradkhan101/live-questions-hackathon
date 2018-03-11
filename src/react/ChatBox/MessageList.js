import React from 'react';
import styled from 'styled-components';
import Message from './Message';

let MessageContainer = styled.div`
    flex-grow: 1;
    padding-left: 8px;
    padding-right: 8px;
`

export default class MessageList extends React.Component {
    render() {
        let { messages, replies } = this.props;
        return (
            <MessageContainer>
                { messages.map( message => <Message
                replies={replies[message.id]}
                data={message} key={message.id} /> ) }
            </MessageContainer>
        )
    }
}