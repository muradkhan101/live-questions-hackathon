import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { FONTSIZE, CHARCOAL, SANSSERIF, ORANGE } from '../../shared/constants';

let UpArrow = styled.div`
  width: 0; 
  height: 0; 
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid ${ORANGE};
`

let DownArrow = styled.div`
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid ${ORANGE};
`
let Text = styled.div`
    font-family: ${SANSSERIF};
    color: ${CHARCOAL};
    font-fize: ${FONTSIZE.md};
    text-align: center;
`
let Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

export default class VoteSystem extends React.Component {
    static contextTypes = {
        id: number,
        score: number
    }
    render() {
        let { id, score } = this.context;
        let { vote } = this.props;
        return (
            <Container>
                <UpArrow onClick={() => vote('upvote', id)}/>
                <Text>{score}</Text>
                <DownArrow onClick={() => vote('downvote', id)}/>
            </Container>
        )
    }
}