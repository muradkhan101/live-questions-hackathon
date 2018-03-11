import React from 'react';
import styled from 'styled-components';
import MessageBox from './ChatBox/MessageBox';
import { SANSSERIF, FONTSIZE, CHARCOAL } from '../shared/constants';

let Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

let Modal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    background: #efefef;
    box-shadow: 0px 1px 2px ${CHARCOAL};
    max-width: 400px;
`

let Title = styled.h1`
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.lg};
    display: inline-block;
    color: ${CHARCOAL};
    margin-bottom: 16px;
`
let BodyText = styled.p`
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.md};
    color: ${CHARCOAL};
    margin-bottom: 8px;
`

export default function LoginWrapper(Comp, test) {
    return class ChatRoomWrappedLogin extends React.Component {
        state = {
            room: ''
        }
        messageCheck(key) {
            if (key === 13 && this.state.message !== '') {
                this.props.onSubmit({
                    room: this.state.message
                })
                this.state.message = '';
            }
        }
        onSubmit({ room }) {
            this.setState({ room: room })
        }
        render() {
            let toRender = this.state.room == ''
                ? <Container>
                    <Modal>
                        <Title> Login to a Room </Title>
                        <BodyText> Enter the name of a chat room to join and get your questions answered by others! </BodyText>
                        <MessageBox checkKeypress={this.messageCheck} placeholder={"Enter a room name"} onSubmit={(data) => this.onSubmit(data)} />
                    </Modal>
                </Container>
                : <Comp room={this.state.room} />
            return toRender;
        }
    }
}
