import React from 'react';
import styled from 'styled-components';
import { CHARCOAL } from '../../shared/constants';

let Image = styled.img`
    border-radius: 50%;
    box-shadow: 0px 0px 2px ${CHARCOAL};
`
export default class ProfileImage extends React.Component {
    render() {
        let { imageUrl, maxSize } = this.props;

        return (
            <Image src={imageUrl} style={{'maxWidth': maxSize, 'maxHeight': maxSize}}/>
        )
    }
}