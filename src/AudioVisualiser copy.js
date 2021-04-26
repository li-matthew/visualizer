import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;



    context.lineWidth = 4;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);


    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height / 2;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();

    // var barWidth = (width / audioData.length);
    // var barHeight;
    // x = 0;
    // for(var i = 0; i < audioData.length; i++) {
    //     barHeight = audioData[i]/2;

    //     context.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    //     context.fillRect(x,height-barHeight/2,barWidth,barHeight);

    //     x += barWidth + 1;
    //   }

  }

  render() {
    return <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvas} />;
  }
}

export default AudioVisualiser;
