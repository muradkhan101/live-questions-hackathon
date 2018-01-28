import React from 'react';
import styled from 'styled-components';
import { number, object } from 'prop-types';
import { FONTSIZE, CHARCOAL, SANSSERIF } from '../../shared/constants';
import UserName from '../Profile/minititle';
import TimeStamp from '../Profile/timestamp';
import ProfileImage from '../Profile/images';
import Voter from './upvote';
import MessageBox from './messagebox';

let Text = styled.div`
    font-family: ${SANSSERIF};
    color: ${CHARCOAL};
    font-size: ${FONTSIZE.sm};
`
let Flex = styled.div`
    display: flex;
    align-items: baseline;
`
let FlexOuter = styled.div`
    display: flex;
`
let FlexApart = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
let TextContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin-left: 16px;
`
let Children = styled.div`
    width: 95%;
    float: right;
    margin-bottom: 8px;
`
let MessageList = styled.div`
    margin-top: 16px;
`
export default class Message extends React.Component {
    static childContextTypes = {
        id: number,
    }
    static contextTypes = {
        socket: object,
        scores: object
    }
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.data);
        this.state.imageUrl = 'rami.jpg';
    }
    getChildContext() {
        return {
            id: this.state.id,
        }
    }
    vote(id, score) {
        console.log(id);
        this.context.socket.emit(score, {id: id});
    }
    reply(id, data) {
        this.context.socket.emit('reply', Object.assign(data, {id: id}))
    }
    render() {
        let { message, name, imageUrl, timestamp, id } = this.state;
        let { isChild, replies } = this.props;
        let score = this.context.scores[id] || 0;
        return (
            <MessageList>
                <FlexApart>
                    <FlexOuter>
                        <ProfileImage imageUrl={imageUrl} maxSize="60px"/>
                        <TextContainer>
                            <Flex>
                                <UserName name={name}/>
                                <TimeStamp timestamp={timestamp} style={{'margin-left': '16px'}}/>
                            </Flex>
                            <Text style={{'marginTop': '12px'}}> {message} </Text>
                        </TextContainer>
                    </FlexOuter>
                    <Voter score={score} vote={(update) => this.vote(id, update)}/>
                </FlexApart>
                {isChild ? null : <MessageBox placeholder={"Answer a question"} onSubmit={(data) => this.reply(id, data) } />}
                <Children>
                    {replies ? replies.map(child => <Message isChild={true} key={child.id} data={child} />) : null }
                </Children>
            </MessageList>
        )
    }
}