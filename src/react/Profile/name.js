import React from 'react';
import styled from 'styled-components';
import { CHARCOAL, SANSSERIF, FONTSIZE } from '../../shared/constants';

let Name = styled.p`
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.md};
    display: inline-block;
`
export default class UserName extends React.Component {
    render() {
        let { name, style } = this.props;
        let styles = {'color': style || CHARCOAL }
        console.log('Name started');
        return (
            <Name style={styles}>{ name }</Name>
        )
    }
}