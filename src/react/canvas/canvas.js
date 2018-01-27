import React from 'react';
import styled from 'styled-components';
import DrawableCanvas from 'react-drawable-canvas';
import ColorOption from './colorOptions';
import Uploader from './photouploader';

let Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export default class DrawingCanvas extends React.Component {
    state = {
        currentUrl: undefined,
        canvas: undefined
    }
    componentDidMount() {
        this.setState({
            canvas : document.querySelector('canvas')
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
    render() {
        let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'black', 'white'];
        return (
            <Container>
                <DrawableCanvas />
                <Uploader onChange={(e) => this.onChange(e)} />
            </Container>
        )
    }
}