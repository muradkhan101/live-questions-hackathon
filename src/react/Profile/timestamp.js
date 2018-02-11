import React from 'react';
import styled from 'styled-components';
import { GREY, SANSSERIF, FONTSIZE } from '../../shared/constants';

let Text = styled.span`
    color: ${GREY};
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.xs};
    margin-left: 12px;
`
export default class TimeStamp extends React.Component {
    makeTime(ts) {
        let date = new Date(ts);
        let hours = date.getHours();
        let minutes = date.getMinutes().toString();
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        minutes = hours > 12 ? minutes + ' PM' : minutes + ' AM';
        hours = hours > 12 ? hours - 12 : hours;
        return hours.toString() + ':' + minutes;
    }

    render() {
        let { timestamp } = this.props;
        return (
            <Text> Sent at: {this.makeTime(timestamp)} </Text>
        )
    }
}