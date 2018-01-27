import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { CHARCOAL, FONTSIZE, SANSSERIF } from '../../shared/constants';

let InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding-left: 16px;
    padding-right: 24px;
    margin-top: 8px;
`
let TextInput = styled.input`
    font-family: ${SANSSERIF};
    font-size: ${FONTSIZE.sm};
    padding-left: 8px;
    margin-right: 8px;
    border: none;
    flex-grow: 1;
    border-radius: 4px;
    :focus {
        outline: none;
        box-shadow: 0px 1px 2px ${CHARCOAL};
    }
`
let Image = styled.img`
    width: 30px;
    :hover {
        cursor: pointer;
    }
`
export default class MessageBox extends React.Component {
    static contextTypes = {
        name: string
    }
    state = {
        message : ''
    }
    checkKeypress(key) {
        if (key === 13 && this.state.message !== '') {
            this.props.onSubmit({
                message: this.state.message,
                name: this.context.name,
                timestamp: Date.now()
            })
            this.state.message = '';
        }
    }
    updateState(value) { this.setState({message: value}); }
    // key = Enter or charCode = 13
    render() {
        return (
            <InputContainer>
                <TextInput 
                onKeyPress={(e) => this.checkKeypress(e.charCode)}
                onChange={(e) => this.updateState(e.target.value)}
                value={this.state.message}
                type="text" placeholder={this.props.placeholder} />
                <Image onClick={() => this.checkKeypress(13)} src="airplane.svg"/>
            </InputContainer>
        )
    }
}