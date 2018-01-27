import React from 'react';
import styled from 'styled-components';

let ImageHolder = styled.div`
    border-radius: 50%;
`
export default class ProfileImage extends React.Component {
    render() {
        let { imageUrl } = this.props;
        console.log('Profile Image started');

        return (
            <ImageHolder>
                <img src={imageUrl} />
            </ImageHolder>
        )
    }
}