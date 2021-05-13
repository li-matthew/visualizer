import React, { useEffect } from 'react';
import { color } from './Info';
import chroma from 'chroma-js'

const AudioVisualiser = ({ audioData }) => {
  var createCanvas = React.createRef();
  var capYPositionArray = [];

  useEffect(() => {
    if (audioData.bAudioData.length > 0) {
      draw();
    }
  }, [audioData.bAudioData])

  const draw = () => {
    console.log(color)
    const canvas = createCanvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');

    var rgb = 'rgb('
    rgb = rgb.concat(color[0])
    for (var i = 1; i < 3; i++) {
      rgb = rgb.concat(", ")
      rgb = rgb.concat(color[i])
    }
    rgb = rgb.concat(")")
    console.log(audioData.oAudioData)

    // context.fillStyle = 'rgba(0, 0, 0, 1)'
    // context.fillRect(0, 0, width, height)

    spectro(canvas, height, width, context, rgb);
  }

  const oscilloscope = (height, width, context, rgb) => {
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.oAudioData.length;

    context.lineWidth = 3;
    context.strokeStyle = rgb;

    context.beginPath();
    for (const item of audioData.oAudioData) {
      const y = (item / 255.0) * height / 4;
      context.lineTo(x, y + height / 3);
      x += sliceWidth;
    }
    context.stroke();
  }

  const bars = (height, width, context, rgb) => {
    console.log('x')
    const capArray = capYPositionArray;
    var barWidth = 1
    var barHeight;
    var xx = 0;
    var capHeight = 1;
    var gap = 0
    var barNum = width / (barWidth + gap)
    var step = Math.pow(audioData.bAudioData.length, 1 / (barNum));
    console.log(audioData.bAudioData)

    context.beginPath();
    for (var i = 0; i < barNum; i++) {
      context.strokeStyle = rgb;
      context.lineWidth = 1;
      //noscale
      // var value = baudioData[i] * height / 255.0

      //log
      var value = audioData.bAudioData[Math.round(Math.pow(step, i))] * height / 255;

      // caps
      context.fillStyle = 'white';
      if (capArray.length < barNum) {
        capArray.push(value);
      };
      if (value < capArray[i]) {
        capArray[i] = capArray[i] - 1

        context.fillRect(i * (barWidth + gap) + gap, height - (capArray[i]) / 3, barWidth, capHeight);

        //weirdeffect, line width must be 1
        // context.lineTo(xx, height - (capYPositionArray[i])/3);
      } else {
        context.fillRect(i * (barWidth + gap) + gap, height - (value / 3) - 1, barWidth, capHeight);

        //weirdeffect
        // context.lineTo(xx, height - value / 3);

        capArray[i] = value;
      };

      //effect
      // context.fillStyle = 'rgba(255,20,147,' + (value / 255.0 - 0.75)  + ')'

      //bars
      context.fillStyle = rgb
      context.fillRect(i * (barWidth + gap) + gap, height - value / 3, barWidth, value / 3);

      //doublebars
      // context.fillRect(i * (barWidth+gap)+gap, height / 2 - value/ 6, barWidth, value / 6);
      // context.fillRect(i * (barWidth+gap)+gap, height / 2, barWidth, value/ 6);

      //line
      // context.lineTo(xx, height - value / 3);
      // xx += barWidth + gap

      //gram
      // context.fillRect(i * (barWidth+gap)+gap, height - 255, barWidth, height);
    }
    context.stroke()
  }

  const spectro = (canvas, height, width, context, rgb) => {
    var hot = chroma.scale(['#000000', rgb, '#ffffff']).gamma(1);
    var barWidth = 1
    var gap = 0
    var barNum = width / (barWidth + gap)

    context.drawImage(canvas, 0, 0, width, height);

    // iterate over the elements from the array
    for (var i = 0; i < barNum / 1; i += 1) {
      // draw each pixel with the specific color
      var value = audioData.bAudioData[i];
      // var value = baudioData[Math.round(Math.pow(step, i))] * height / 255 / 3;
      context.fillStyle = hot(value / 255.0).hex();

      // draw the line at the right side of the canvas
      context.fillRect(width - 1, height - i, 1, 1);
    }

    // set translate on the canvas
    context.translate(-1, 0);
    // draw the copied image
    context.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);

    // reset the transformation matrix
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  return (
    <canvas width={window.innerWidth / 2} height={window.innerHeight} ref={createCanvas} />
  )
}

export default AudioVisualiser;
