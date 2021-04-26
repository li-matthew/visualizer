import React, { useEffect } from 'react';

const AudioVisualiser  = ({ audioData }) => {
    var createCanvas = React.createRef();

  useEffect(() => {
    if (audioData.length > 0) {
      draw();
    }
  },[audioData])

  const draw = () => {
    const canvas = createCanvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.fillStyle = 'rgba(0, 0, 0, 0.08)'
    context.fillRect(0, 0, width, height)

    context.beginPath();
    for (const item of audioData) {
      const y = (item / 255.0) * height / 4;
      context.lineTo(x, y + height/ 3);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  return (
    <canvas width={window.innerWidth} height={window.innerHeight} ref={createCanvas} />
  )
}

export default AudioVisualiser;
