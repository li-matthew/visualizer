import React from 'react';
import { Slider, Typography, Grid, AppBar, Tabs, Tab } from '@material-ui/core'
import Oscilloscope from './Oscilloscope'
import { thickness } from './Oscilloscope'
import Spectrogram from './Spectrogram'
import { gamma } from './Spectrogram'
import Bars from './Bars'
import { barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type } from './Bars'

var fade = 0.8;
var color = [1, 255, 79];
var width = 50;
var height = 30;
var smoothing = 0.9;
var fft = 4096;
var tab = 'bars'
var spectroScale = 1;
// var currentHeight = window.innerHeight * (height / 100.0) / spectroScale;

const fftSizes = [
  { value: 64 },
  { value: 128 },
  { value: 256 },
  { value: 512 },
  { value: 1024 },
  { value: 2048 },
  { value: 4096 }
];

const ControlBar = ({ controlAudio }) => {
  const [currentTab, setCurrentTab] = React.useState('bars');
  const [fadeDisable, setFadeDisable] = React.useState(false);
  const [smoothingDisable, setSmoothingDisable] = React.useState(false);
  // const reset = () => {
  //   controlAudio.toggleAudio();
  //   controlAudio.toggleAudio();
  // }

  const currentControls = () => {
    switch (currentTab) {
      case 'oscilloscope':
        return <Oscilloscope />;
      case 'bars':
        return <Bars />;
      case 'spectrogram':
        return <Spectrogram />;
    }
  }

  return (
    <div className='ControlBar'>
      <Tabs
        variant='fullWidth'
        textColor='primary'
        indicatorColor='primary'
        value={currentTab}
        onChange={(event, value) => {
          setCurrentTab(value);
          tab = value;
          if (value === 'spectrogram') {
            setFadeDisable(true)
            setSmoothingDisable(false)
            if (fft < 2048) {
              spectroScale = 2048 / fft;
            } else {
              spectroScale = 1;
            }
          } else if (value === 'oscilloscope') {
            setFadeDisable(false)
            setSmoothingDisable(true)
            spectroScale = 1;
          } else {
            setFadeDisable(false)
            setSmoothingDisable(false)
            spectroScale = 1;
          }
          if (controlAudio.audio) {
            controlAudio.toggleAudio();
          }
        }}>
        <Tab value="oscilloscope" label="oscilloscope" />
        <Tab value="bars" label="bars" />
        <Tab value="spectrogram" label="spectrogram" />
      </Tabs>
      <div className='controlCard'>
        {currentControls()}
      </div>
      <div className='controlCard'>
        <Typography className="controlTitle" gutterBottom>fade</Typography>
        <Slider id='fade'
          min={0}
          max={1}
          step={0.01}
          disabled={fadeDisable}
          defaultValue={0.8}
          valueLabelDisplay='auto'
          color='secondary'
          onChange={(event, value) => {
            fade = value;
          }}
        />
        <Typography className="controlTitle" gutterBottom>color</Typography>
        <div className='color'>
          <Grid container spacing={3}>
            <Grid item xs>
              <Slider id='red'
                min={0}
                max={255}
                step={1}
                defaultValue={1}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  color[0] = value;
                }}
              />
            </Grid>
            <Grid item xs>
              <Slider id='green'
                min={0}
                max={255}
                step={1}
                defaultValue={255}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  color[1] = value;
                }}
              />
            </Grid>
            <Grid item xs>
              <Slider id='blue'
                min={0}
                max={255}
                step={1}
                defaultValue={79}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  color[2] = value;
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className='dimensions'>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography className="controlTitle" id='width' gutterBottom>width</Typography>
              <Slider id='width'
                min={1}
                max={100}
                step={0.1}
                defaultValue={50}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  width = value;
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography className="controlTitle" id='height' gutterBottom>height</Typography>
              <Slider id='height'
                min={1}
                max={100}
                step={0.1}
                defaultValue={30}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  height = value;
                  // currentHeight = window.innerHeight * (value / 100.0) / spectroScale;
                  // console.log(currentHeight)
                }}
              />
            </Grid>
          </Grid>
        </div>
        <Typography className="controlTitle" gutterBottom>(will reset)</Typography>
        <div className='analyser'>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography className="controlTitle" id='smoothing' gutterBottom>smoothing</Typography>
              <Slider id='smoothing'
                min={0}
                max={1}
                step={0.01}
                disabled={smoothingDisable}
                defaultValue={0.9}
                valueLabelDisplay='auto'
                color='secondary'
                onChangeCommitted={(event, value) => {
                  smoothing = value;
                  if (controlAudio.audio) {
                    controlAudio.toggleAudio();
                  }
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography className="controlTitle" id='fft' gutterBottom>fft</Typography>
              <Slider id='fft'
                min={0}
                max={4096}
                step={null}
                defaultValue={4096}
                aria-labelledby='discrete-slider-restrict'
                marks={fftSizes}
                valueLabelDisplay='auto'
                color='secondary'
                onChangeCommitted={(event, value) => {
                  fft = value;
                  if (value < 2048 && tab === 'spectrogram') {
                    spectroScale = 2048 / value;
                    // currentHeight = window.innerHeight * (height / 100.0) / spectroScale;
                    // console.log('x')
                  } else {
                    spectroScale = 1;
                    // currentHeight = window.innerHeight * (height / 100.0) / spectroScale;
                  }
                  if (controlAudio.audio) {
                    controlAudio.toggleAudio();
                  }
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export {
  color, width, height, thickness, fade, gamma,
  barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type, smoothing, fft, tab, spectroScale
};

// export { currentHeight }

export default ControlBar