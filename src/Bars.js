import React from 'react'
import {
    Slider, Typography, Switch, Grid, Radio, RadioGroup,
    FormControlLabel
} from '@material-ui/core'

var barWidth = 1;
var gap = 10;
var log = true;
var caps = true;
var opacity = false;
var lineFill = false;
var capColor = [252, 0, 25];
var capSpeed = 1;
var type = 'bars'
// var lineThickness = 1;

const Bars = () => {
    const [capDisable, setCapDisable] = React.useState(false)
    const [opacityDisable, setOpacityDisable] = React.useState(false)
    const [lineFillDisable, setLineFillDisable] = React.useState(true)

    return (
        <div class='bars'>
            <RadioGroup row defaultValue='bars' onChange={(event, value) => {
                type = value;
                if (value == 'doublebars') {
                    setCapDisable(true)
                    setOpacityDisable(false)
                    setLineFillDisable(true)
                    caps = false;
                    lineFill = false;
                } else if (value == 'line') {
                    setCapDisable(true)
                    caps = false;
                    setOpacityDisable(true)
                    setLineFillDisable(false)
                    opacity = false
                } else {
                    setCapDisable(false)
                    setOpacityDisable(false)
                    setLineFillDisable(true)
                    lineFill = false
                }
            }}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography class="controlTitle" id='barRadio' gutterBottom color='inherit'>bars</Typography>
                        <FormControlLabel value="bars" control={<Radio />} labelPlacement='top' />
                    </Grid>
                    <Grid item xs>
                        <Typography class="controlTitle" id='doubleBarRadio' gutterBottom color='inherit'>double bars</Typography>
                        <FormControlLabel value="doublebars" control={<Radio />} labelPlacement='top' />
                    </Grid>
                    <Grid item xs>
                        <Typography class="controlTitle" id='lineRadio' gutterBottom color='inherit'>line</Typography>
                        <FormControlLabel value="line" control={<Radio />} labelPlacement='top' />
                    </Grid>
                </Grid>
            </RadioGroup>
            <Grid container spacing={4}>
                <Grid item xs>
                    <Typography class="controlTitle" id='barWidth' gutterBottom color='inherit'>bar width</Typography>
                    <Slider id='barWidth'
                        min={1}
                        max={50}
                        step={1}
                        defaultValue={1}
                        valueLabelDisplay='auto'
                        color='secondary'
                        onChange={(event, value) => {
                            barWidth = value;
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography class="controlTitle" id='gap' gutterBottom color='inherit'>gap</Typography>
                    <Slider id='gap'
                        min={0}
                        max={25}
                        step={1}
                        defaultValue={10}
                        valueLabelDisplay='auto'
                        color='secondary'
                        onChange={(event, value) => {
                            gap = value;
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography class="controlTitle" id='capSpeed' gutterBottom color='inherit'>cap speed</Typography>
                    <Slider id='capSpeed'
                        min={0.25}
                        max={1.25}
                        step={0.01}
                        defaultValue={1}
                        valueLabelDisplay='auto'
                        color='secondary'
                        onChange={(event, value) => {
                            capSpeed = value;
                        }}
                    />
                </Grid>
                {/* <Grid item xs>
                    <Typography class="controlTitle" id='lineThickness' gutterBottom color='inherit'>line thickness</Typography>
                    <Slider id='lineThickness'
                        min={0}
                        max={10}
                        step={0.1}
                        defaultValue={1}
                        valueLabelDisplay='auto'
                        color='secondary'
                        onChange={(event, value) => {
                            lineThickness = value;
                        }}
                    />
                </Grid> */}
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs>
                    <Typography class="controlTitle" id='log' gutterBottom color='inherit'>log</Typography>
                    <Switch id='log'
                        defaultChecked={true}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(event, value) => {
                            log = value
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography class="controlTitle" id='caps' gutterBottom color='inherit'>caps</Typography>
                    <Switch id='caps'
                        defaultChecked={true}
                        disabled={capDisable}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(event, value) => {
                            caps = value
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography class="controlTitle" id='opacity' gutterBottom color='inherit'>opacity</Typography>
                    <Switch id='opacity'
                        defaultChecked={false}
                        disabled={opacityDisable}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(event, value) => {
                            opacity = value
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography class="controlTitle" id='lineFill' gutterBottom color='inherit'>line fill</Typography>
                    <Switch id='lineFill'
                        defaultChecked={false}
                        disabled={lineFillDisable}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(event, value) => {
                            lineFill = value;
                        }}
                    />
                </Grid>
            </Grid>
            <Typography class="controlTitle" gutterBottom color='inherit'>cap color</Typography>
            <div class='capColor'>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Slider id='red'
                            min={0}
                            max={255}
                            step={1}
                            defaultValue={252}
                            valueLabelDisplay='auto'
                            color='secondary'
                            onChange={(event, value) => {
                                capColor[0] = value;
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Slider id='green'
                            min={0}
                            max={255}
                            step={1}
                            defaultValue={0}
                            valueLabelDisplay='auto'
                            color='secondary'
                            onChange={(event, value) => {
                                capColor[1] = value;
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Slider id='blue'
                            min={0}
                            max={255}
                            step={1}
                            defaultValue={25}
                            valueLabelDisplay='auto'
                            color='secondary'
                            onChange={(event, value) => {
                                capColor[2] = value;
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export { barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type }

export default Bars;