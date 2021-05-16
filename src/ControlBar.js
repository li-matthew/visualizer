import React from 'react';
import { Slider, Typography, ButtonGroup, Button } from '@material-ui/core'

var thickness = 1;
var fade = 0;
var color = [20, 255, 235];

const ControlBar = () => {
  // const [thickness, setThickness] = React.useState();
  const reset = () => {

  }

  return (
    <div class='ControlBar'>
      <ButtonGroup color="secondary">
        <Button id='butt' active='true'>oscilloscope</Button>
        <Button id='butt'>bars</Button>
        <Button id='butt'>spectrogram</Button>
      </ButtonGroup>
      <Typography class="controlTitle" gutterBottom color='inherit'>thickness</Typography>
      <Slider id='thickness'
        min={0}
        max={10}
        step={0.01}
        defaultValue={1}
        valueLabelDisplay='auto'
        color='secondary'
        onChange={(event, value) => {
          thickness = value;
        }}
      />
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
        <Slider id='red'
          min={0}
          max={255}
          step={1}
          defaultValue={20}
          valueLabelDisplay='auto'
          color='secondary'
          onChange={(event, value) => {
            color[0] = value;
          }}
        />
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
        <Slider id='blue'
          min={0}
          max={255}
          step={1}
          defaultValue={235}
          valueLabelDisplay='auto'
          color='secondary'
          onChange={(event, value) => {
            color[2] = value;
          }}
        />
      </div>
    </div>
  );
}

export { thickness, fade, color };

export default ControlBar