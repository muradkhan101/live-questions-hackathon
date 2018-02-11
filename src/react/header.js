import React from 'react';
import styled from 'styled-components';
import ProfilePicture from './Profile/images';

import { FONTSIZE, SANSSERIF, BLUE, CHARCOAL } from '../shared/constants';

let MainTitle = styled.h1`
    color: white;
    font-size: ${FONTSIZE.xl};
    font-family: ${SANSSERIF};
`
let Background = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${BLUE};
    width: 100%;
    height: 140px;
    padding-left: 24px;
    padding-right: 16px;
    padding-top: 16px;
    box-shadow: 0px 1px 2px ${CHARCOAL};
`

let Subtitle = styled.h2`
    color: white;
    font-size: ${FONTSIZE.md};
    font-family: ${SANSSERIF};
    margin-top: 12px;
`
export default class Header extends React.Component {
    render() {
        let { event, presenter } = this.props;
        return (
            <Background>
                <div>
                    <MainTitle>{event}</MainTitle>
                    <Subtitle>Presented by: {presenter || 'Rami Malek'} </Subtitle>
                    <Subtitle>{(new Date()).toDateString()} </Subtitle>
                </div>
                <ProfilePicture maxSize={'100px'} imageUrl={'rami.jpg'} />
            </Background>
        )
    }
}