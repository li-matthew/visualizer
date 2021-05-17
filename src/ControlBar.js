import React from 'react';
import { Slider, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import Oscilloscope from './Oscilloscope'
import { thickness } from './Oscilloscope'
import Spectrogram from './Spectrogram'
import { gamma } from './Spectrogram'
import Bars from './Bars'
import { barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type } from './Bars'

var fade = 0;
var color = [1, 255, 79];
var select = 'left'
var width = 50;
var height = 30;

const ControlBar = () => {
  return (
    <div class='ControlBar'>
      {/* <Oscilloscope /> */}
      {/* <Spectrogram /> */}
      <div class='controlCard'>
        <Bars />
      </div>
      <div class='controlCard'>
        <Typography class="controlTitle" gutterBottom color='inherit'>fade</Typography>
        <Slider id='fade'
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          valueLabelDisplay='auto'
          color='secondary'
          onChange={(event, value) => {
            fade = value;
          }}
        />
        <Typography class="controlTitle" gutterBottom color='inherit'>color</Typography>
        <div class='color'>
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
        <div class='dimensions'>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography class="controlTitle" id='width' gutterBottom color='inherit'>width</Typography>

              <Slider id='width'
                min={0}
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
              <Typography class="controlTitle" id='height' gutterBottom color='inherit'>height</Typography>
              <Slider id='height'
                min={0}
                max={100}
                step={0.1}
                defaultValue={30}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                  height = value;
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
  barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type
};

export default ControlBar