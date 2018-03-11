import React from 'react';
import styled from 'styled-components';
import { object, string, func, array } from 'prop-types';

import MessageList from './ChatBox/MessageList';
import TopMessageList from './ChatBox/TopMessageList';
import Header from './Header';
import MessageBox from './ChatBox/MessageBox';
import MiniTitle from './Profile/MiniTitle';

import { BASEURL } from '../shared/constants';

let Container = styled.div`
    display: flex;
    flex-direction: column;
`
let StickToBottom = styled.div`
    position: fixed;
    bottom: 8px;
    width: 100%;
`
export default class Attendee extends React.Component {
    static contextTypes = {
        messages: array,
        replies: object,
        scores: object,
        name: string,
        question: func,
        login: func,
    }

    render() {
        let { messages, replies, scores, question, login, name } = this.context;
        console.log(this.context);

        return (
            <Container>
                <Header/>
                { messages.length > 4 ? <TopMessageList messages={messages} replies={replies} /> : null }
                <MessageList messages={messages} replies={replies} />
                { 
                this.context.name !== ''
                    ? <span style={{'marginBottom': '50px'}}>
                        <StickToBottom>
                            <MessageBox placeholder={"Ask a question"} onSubmit={(data) => question(data)} />
                        </StickToBottom>
                     </span>
                    : <StickToBottom>
                        <MiniTitle style={{'marginLeft': '24px'}} name={"Log-in to ask a question!"} />
                        <MessageBox placeholder={"Choose a username!"} onSubmit={(data) => login(data)} />
                    </StickToBottom>
                }
            </Container>
        )
    }
}