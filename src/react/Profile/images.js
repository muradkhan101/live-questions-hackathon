import React from 'react';
import styled from 'styled-components';

let Image = styled.img`
    border-radius: 50%;
`
export default class ProfileImage extends React.Component {
    render() {
        let { imageUrl, maxSize } = this.props;

        return (
            <Image src={imageUrl} style={{'maxWidth': maxSize, 'maxHeight': maxSize}}/>
        )
    }
}