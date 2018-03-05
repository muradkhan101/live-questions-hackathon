import React from 'react';
import styled from 'styled-components';
import { object, string } from 'prop-types';
import DrawableCanvas from 'react-drawable-canvas';
import ColorOption from './colorOptions';
import Uploader from './photouploader';

let Container = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`
let Flex = styled.div`
    display: flex;
    justify-context: space-between;
`

export default class DrawingCanvas extends React.Component {
    static contextTypes = {
        socket: object,
        room: string,
    }
    state = {
        currentUrl: undefined,
        canvas: undefined
    }
    componentDidMount() {
        this.setState({
            canvas : document.querySelector('main canvas')
        })
    }
    onChange(e) {
        if (e.target.files.length) {
            let file = e.target.files[0];
            let url = window.URL.createObjectURL(file);
            this.setState({currentUrl: url});
            // Load photo to Canvas
            let this_ = this;
            let ctx = this_.state.canvas.getContext('2d');
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            return new Promise((resolve, reject) => {
                img.onload = function () {
                    let w = Math.min(this.width, 500);
                    let h = Math.round( this.height / this.width * w);
                    this_.state.canvas.height = h;
                    this_.state.canvas.width = w;
                    ctx.drawImage(this, 0, 0, w, h);
                    loaded(w, h);
                }
                img.src = url
                function loaded(w, h) {
                    let imgData = ctx.getImageData(0, 0, w, h);
                    this_.state.imgData = imgData;
                    resolve(imgData);
                }
            })
        }
    }
    sendPhoto() {
        let { canvas } = this.state;
        let imageData = canvas.toDataURL();
        this.context.socket.emit('canvas', imageData, this.context.room);
    }
    render() {
        let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'black', 'white']
        return (
            <Container ref="canvasContainer">
                <DrawableCanvas onStop={() => this.sendPhoto()}/>
                <Uploader onChange={(e) => this.onChange(e)} />
            </Container>
        )
    }
}
