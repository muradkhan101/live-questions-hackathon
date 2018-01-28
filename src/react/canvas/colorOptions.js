import React from 'react';
import styled from 'styled-components';

let Color = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 2px;
`

export default class ColorOption extends React.Component {
    render() {
        let { color, onClick } = this.props;
        let styles = { 'backgroundColor': color};
        return (
            <Color style={styles} onClick={() => onClick(color)}/>
        )
    }
}
