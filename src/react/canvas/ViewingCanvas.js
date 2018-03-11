import React from 'react';
import { object } from 'prop-types';

export default class ViewingCanvas extends React.Component {
    static contextTypes = {
        socket: object
    }
    state = {
        ctx: undefined
    }
    componentDidMount() {
        this.setState({ ctx: this.refs.canvas.getContext('2d') })
        
    }
    componentDidUpdate() {
        if (this.context.socket)
            this.context.socket.on('update canvas', ( imageData) => {
                this.receivePhoto(imageData);
            })
    }
    receivePhoto(imageData) {
        let image = new Image();
        image.onload = () => {
            console.log(this.refs);
            this.refs.canvas.width = image.width;
            this.refs.canvas.height = image.height;
            this.state.ctx.drawImage(image, 0, 0);
        }
        image.src = imageData;
    }
    render() {
        return (
            <canvas ref="canvas" />
        )
    }
}
