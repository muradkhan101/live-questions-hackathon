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
    receivePhoto({imageData, height, width}) {
        console.log(imageData);
        if (imageData instanceof ArrayBuffer) {
            console.log('passed check')
            var bytearray = new Uint8Array(imageData);
            var { canvas } = this.refs;
            canvas.width = width;
            canvas.height = height;
            let { ctx } = this.state;
            var imgdata = ctx.getImageData(0, 0, width, height);
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