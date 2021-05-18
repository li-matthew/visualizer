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

const Bars = () => {
    const [capDisable, setCapDisable] = React.useState(false)
    const [opacityDisable, setOpacityDisable] = React.useState(false)
    const [lineFillDisable, setLineFillDisable] = React.useState(true)

    return (
        // <div className='bars'>
        <React.Fragment>
            <RadioGroup row defaultValue='bars' onChange={(event, value) => {
                type = value;
                if (value === 'doublebars') {
                    setCapDisable(true)
                    setOpacityDisable(false)
                    setLineFillDisable(true)
                    caps = false;
                    lineFill = false;
                } else if (value === 'line') {
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
                        <Typography className="controlTitle" id='barRadio'>bars</Typography>
                        <FormControlLabel value="bars" control={<Radio />} labelPlacement='top' />
                    </Grid>
                    <Grid item xs>
                        <Typography className="controlTitle" id='doubleBarRadio'>double bars</Typography>
                        <FormControlLabel value="doublebars" control={<Radio />} labelPlacement='top' />
                    </Grid>
                    <Grid item xs>
                        <Typography className="controlTitle" id='lineRadio'>line</Typography>
                        <FormControlLabel value="line" control={<Radio />} labelPlacement='top' />
                    </Grid>
                </Grid>
            </RadioGroup>
            <Grid container spacing={4}>
                <Grid item xs>
                    <Typography className="controlTitle" id='barWidth' gutterBottom>bar width</Typography>
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
                    <Typography className="controlTitle" id='gap' gutterBottom>gap</Typography>
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
                    <Typography className="controlTitle" id='capSpeed' gutterBottom>cap speed</Typography>
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
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs>
                    <Typography className="controlTitle" id='log' gutterBottom>log</Typography>
                    <Switch id='log'
                        defaultChecked={true}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(event, value) => {
                            log = value
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography className="controlTitle" id='caps' gutterBottom>caps</Typography>
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
                    <Typography className="controlTitle" id='opacity' gutterBottom>opacity</Typography>
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
                    <Typography className="controlTitle" id='lineFill' gutterBottom>line fill</Typography>
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
            <Typography className="controlTitle" gutterBottom>cap color</Typography>
            <div className='capColor'>
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
           </React.Fragment>
        // </div>
    )
}

export { barWidth, gap, log, caps, opacity, lineFill, capColor, capSpeed, type }

export default Bars;