import React from 'react';
import styled from 'styled-components';
import { CHARCOAL, SANSSERIF, FONTSIZE } from '../../shared/constants';

let Name = styled.span`
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.md};
    display: inline-block;
    color: ${CHARCOAL};
`
export default class MiniTitle extends React.Component {
    render() {
        let { name, style } = this.props;
        return (
            <Name style={style}>{ name }</Name>
        )
    }
}