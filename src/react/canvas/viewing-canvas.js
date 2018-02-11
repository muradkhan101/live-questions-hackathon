<<<<<<< HEAD
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
            this.context.socket.on('update canvas', ({ imageData, width, height }) => {
                this.receivePhoto(imageData, height, width);
            })
    }
    receivePhoto(imageData) {
        let image = new Image();
        image.onload = () => {
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
||||||| merged common ancestors
=======
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
        this.context.socket.on('update canvas', ({imageData, width, height}) => {
            this.receivePhoto(imageData, height, width);
        })
    }
    receivePhoto(data) {
        console.log(data.imageData);
        if (data.imageData instanceof ArrayBuffer) {
            console.log('passed check')
            var bytearray = new Uint8Array(data.imageData);
            var { canvas } = this.refs;
            canvas.width = data.width;
            canvas.height = data.height;
            let { ctx } = this.state;
            var imgdata = ctx.getImageData(0, 0, data.width, data.height);
            var imgdatalen = imgdata.data.length;
            for (var i = 8; i < imgdatalen; i++) {
                imgdata.data[i] = bytearray[i];
            }
            ctx.putImageData(imgdata, 0, 0);
        }
    }
    render() {
        return (
            <canvas ref="canvas" />
        )
    }
}
>>>>>>> routes
