import React from 'react';
import styled from 'styled-components';
import { number, object } from 'prop-types';
import { FONTSIZE, CHARCOAL, SANSSERIF } from '../../shared/constants';
import UserName from '../Profile/name';
import TimeStamp from '../Profile/timestamp';
import ProfileImage from '../Profile/images';
import Voter from './upvote';
import MessageBox from './messagebox';

let Text = styled.div`
    font-family: ${SANSSERIF};
    color: ${CHARCOAL};
    font-fize: ${FONTSIZE.md};
`
let Flex = styled.div`
    display: flex;
    align-items: baseline;
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
    width: 85%;
    float: right;
`
let MessageList = styled.div`
    margin-top: 16px;
`
export default class Message extends React.Component {
    static childContextTypes = {
        id: number,
        score: number,
    }
    static contextTypes = {
        socket: object
    }
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.data);
    }
    getChildContext() {
        return {
            id: this.state.id,
            score: this.state.score
        }
    }
    vote(id, score) {
        this.context.socket.emit(score, {id: id});
    }
    render() {
        let { message, name, imageUrl, timestamp, id, children } = this.state;
        let { isChild } = this.props;
        return (
            <MessageList>
                <FlexApart>
                    <Flex>
                        <ProfileImage imageUrl={imageUrl}/>
                        <TextContainer>
                            <Flex>
                                <UserName name={name}/>
                                <TimeStamp timestamp={timestamp} style={{'margin-left': '16px'}}/>
                            </Flex>
                            <Text style={{'marginTop': '12px'}}> {message} </Text>
                        </TextContainer>
                    </Flex>
                    <Voter vote={() => (score) => this.vote(id, score)}/>
                </FlexApart>
                {isChild ? null : <MessageBox />}
                <Children>
                    { children ? children.map(child => <Message isChild={true} key={child.id} data={child} />) : null }
                </Children>
            </MessageList>
        )
    }
}