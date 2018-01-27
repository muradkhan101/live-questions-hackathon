import React from 'react';
import { number, object } from 'prop-types';
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
    :focus {
        outline: none;
        box-shadow: 0px 0.5px 0.5px ${CHARCOAL};
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
        id: number,
        socket: object
    }
    render() {
        return (
            <InputContainer>
                <TextInput onKeyPress={(e) => console.log(e.key, e.charCode)} type="text" placeholder="Answer question"/>
                <Image src="airplane.svg"/>
            </InputContainer>
        )
    }
}