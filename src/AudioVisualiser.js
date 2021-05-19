import React, { useLayoutEffect, useRef } from 'react';
// import { color } from './Info';
import chroma from 'chroma-js'

import {
  fade, color, width, height, thickness, gamma,
  barWidth, gap, log, caps, opacity, capColor, capSpeed, type, lineFill, fft, tab, spectroScale
} from './ControlBar'

// var spectroScale = 1;
    

const AudioVisualiser = ({ audioData }) => {
  var createCanvas = React.createRef();
  var capYPositionArray = useRef([]);
  useLayoutEffect(() => {
    if (audioData.length > 0) {
      draw();
    }
  }, [audioData])

  const draw = () => {
    const canvas = createCanvas.current;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const context = canvas.getContext('2d');
    // if (fft < 2048 && tab === 'spectrogram') {
    //   spectroScale = 2048 / fft;
    // }

    var caprgb;
    if (caps) {
      caprgb = 'rgb('
      caprgb = caprgb.concat(capColor[0])
      for (var i = 1; i < 3; i++) {
        caprgb = caprgb.concat(", ")
        caprgb = caprgb.concat(capColor[i])
      }
      caprgb = caprgb.concat(")")
    }

    var rgb = 'rgb('
    rgb = rgb.concat(color[0])
    for (var j = 1; j < 3; j++) {
      rgb = rgb.concat(", ")
      rgb = rgb.concat(color[j])
    }
    rgb = rgb.concat(")")
    if (tab !== 'spectrogram') {
      context.fillStyle = 'rgba(34, 34, 34, ' + (1 - fade) + ')'
      context.fillRect(0, 0, canvasWidth, canvasHeight)
    }
    switch (tab) {
      case 'oscilloscope':
        oscilloscope(canvasHeight, canvasWidth, context, rgb, thickness);
        break;
      case 'bars':
        bars(canvasHeight, canvasWidth, context, rgb, barWidth, gap, log, caps, opacity, caprgb, capSpeed, type);
        break;
      case 'spectrogram':
        spectro(canvas, canvasHeight, canvasWidth, context, rgb, gamma);
        break;
    }
  }

  const oscilloscope = (height, width, context, rgb, thickness) => {
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = thickness;
    context.strokeStyle = rgb;
    // var hot = chroma.scale(['#000000', 'red', '#ffffff']).gamma(1);
    context.beginPath();
    for (const item of audioData) {
      // context.strokeStyle = hot(item).hex();
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.stroke();
  }

  const bars = (height, width, context, rgb, barWidth, gap, log, caps, opacity, caprgb, capSpeed, type) => {
    const capArray = capYPositionArray.current;
    // var barWidth = barWidth;
    var xx = 0;
    var capHeight = 1;
    // var gap = gap;
    var barNum = width / (barWidth + gap)
    var step = Math.pow(audioData.length, 1 / (barNum));

    context.beginPath();
    for (var i = 0; i < barNum; i++) {
      context.strokeStyle = rgb;
      context.lineWidth = 1;
      var value;
      if (log) {
        value = audioData[Math.round(Math.pow(step, i))] * height / 255;
      } else {
        value = audioData[i] * height / 255.0
      }

      // caps
      if (caps || lineFill) {
        context.fillStyle = caprgb;
        if (capArray.length < barNum) {
          capArray.push(value);
        };
        if (value < capArray[i]) {
          capArray[i] = capArray[i] - capSpeed
          if (caps) {
            context.fillRect(i * (barWidth + gap) + gap, height - (capArray[i]), barWidth, capHeight);
          } else {
            context.lineTo(xx, height - (capArray[i]));
          }
        } else {
          if (caps) {
            context.fillRect(i * (barWidth + gap) + gap, height - (value) - 1, barWidth, capHeight);
          } else {
            context.lineTo(xx, height - value);
          }
          capArray[i] = value;
        };
      }

      //effect
      if (opacity) {
        context.fillStyle = 'rgba' + rgb.substring(3, rgb.length - 1) + ',' + (value / 255.0 - fade / 7.5) + ')';
      } else {
        context.fillStyle = rgb
      }

      //bars
      if (type === 'doublebars') {
        context.fillRect(i * (barWidth + gap) + gap, height / 2 - value / 2, barWidth, value / 2);
        context.fillRect(i * (barWidth + gap) + gap, height / 2, barWidth, value / 2);
      } else if (type === 'bars') {
        context.fillRect(i * (barWidth + gap) + gap, height - value, barWidth, value);
      } else if (type === 'line') {
        context.lineTo(xx, height - value);
        xx += barWidth + gap
      }
    }
    context.stroke()
  }

  const spectro = (canvas, height, width, context, rgb, gamma) => {
    var hot = chroma.scale(['#000000', rgb, '#ffffff']).gamma(gamma);
    var barWidth = 1
    var gap = 0
    var barNum = width / (barWidth + gap)

    context.drawImage(canvas, 0, 0, width, height);

    for (var i = 0; i < barNum / 1; i += 1) {
      var value = audioData[i];
      // var value = baudioData[Math.round(Math.pow(step, i))] * height / 255 / 3;
      context.fillStyle = hot(value / 255.0).hex();

      context.fillRect(width - 1, height - i, 1, 1);
    }

    context.translate(-1, 0);
    context.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);

    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  return (
    <canvas width={window.innerWidth * width / 100.0} height={window.innerHeight * (height / 100.0) / spectroScale} ref={createCanvas} />
  )
}

export default AudioVisualiser;
