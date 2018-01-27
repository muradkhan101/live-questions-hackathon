import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { FONTSIZE, CHARCOAL, SANSSERIF } from '../../shared/constants';
import UserName from '../Profile/name';
import TimeStamp from '../Profile/timestamp';
import ProfileImage from '../Profile/images';
import Voter from './upvote';

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
`
let TextContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin-left: 16px;
`


export default class Message extends React.Component {
    static childContextTypes = {
        id: number,
        score: number
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
    vote(score) {

    }
    render() {
        let { message, name, imageUrl, timestamp } = this.state;
        return (
            <FlexApart>
                <Flex>
                    <ProfileImage imageUrl={imageUrl}/>
                    <TextContainer>
                        <Flex>
                            <UserName name={name}/>
                            <TimeStamp timestamp={timestamp} style={{'margin-left': '16px'}}/>
                        </Flex>
                        <Text style={{'margin-top': '12px'}}> {message} </Text>
                    </TextContainer>
                </Flex>
                <Voter />
            </FlexApart>
        )
    }
}