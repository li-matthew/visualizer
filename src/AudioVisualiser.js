import React, { useEffect, useLayoutEffect, useRef } from 'react';
// import { color } from './Info';
import chroma from 'chroma-js'
import {
  fade, color, width, height, thickness, gamma,
  barWidth, gap, log, caps, opacity, capColor, capSpeed, type, lineFill
} from './ControlBar'

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
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    console.log(type)

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
    for (var i = 1; i < 3; i++) {
      rgb = rgb.concat(", ")
      rgb = rgb.concat(color[i])
    }
    rgb = rgb.concat(")")

    context.fillStyle = 'rgba(51, 51, 51, ' + (1 - fade) + ')'
    context.fillRect(0, 0, width, height)

    // oscilloscope(height, width, context, rgb, thickness);
    // spectro(canvas, height, width, context, rgb, gamma);
    bars(height, width, context, rgb, barWidth, gap, log, caps, opacity, caprgb, capSpeed, type);
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
      const y = (item / 255.0) * height / 4;
      context.lineTo(x, y + height / 3);
      x += sliceWidth;
    }
    context.stroke();
  }

  const bars = (height, width, context, rgb, barWidth, gap, log, caps, opacity, caprgb, capSpeed, type) => {
    const capArray = capYPositionArray.current;
    var barWidth = barWidth;
    var barHeight;
    var xx = 0;
    var capHeight = 1;
    var gap = gap;
    var barNum = width / (barWidth + gap)
    var step = Math.pow(audioData.length, 1 / (barNum));

    context.beginPath();
    for (var i = 0; i < barNum; i++) {
      context.strokeStyle = rgb;
      context.lineWidth = 1;

      if (log) {
        var value = audioData[Math.round(Math.pow(step, i))] * height / 255;
      } else {
        var value = audioData[i] * height / 255.0
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
        context.fillStyle = 'rgba' + rgb.substring(3, rgb.length - 1) + ',' + (value / 255.0) + ')';
      } else {
        context.fillStyle = rgb
      }

      //bars
      if (type == 'doublebars') {
        context.fillRect(i * (barWidth + gap) + gap, height / 2 - value / 2, barWidth, value / 2);
        context.fillRect(i * (barWidth + gap) + gap, height / 2, barWidth, value / 2);
      } else if (type == 'bars') {
        context.fillRect(i * (barWidth + gap) + gap, height - value, barWidth, value);
      } else if (type == 'line') {
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
    <canvas width={window.innerWidth * width / 100.0} height={window.innerHeight * height / 100.0} ref={createCanvas} />
  )
}

export default AudioVisualiser;