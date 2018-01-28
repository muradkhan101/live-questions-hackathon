import React from 'react';
import DrawingCanvas from './canvas/canvas';

export default class Presenter extends React.Component {
    render() {
        return (
            <div>
                <DrawingCanvas/>
            </div>
        )
    }
}