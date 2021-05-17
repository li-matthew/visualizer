import React from 'react'
import { Slider, Typography } from '@material-ui/core'

var gamma = 1;

const Spectrogram = () => {
    return (
        <div>
            <Typography class="controlTitle" gutterBottom color='inherit'>gamma</Typography>
            <Slider id='thickness'
                min={0}
                max={5}
                step={0.01}
                defaultValue={1}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                    gamma = value;
                }}
            />
        </div>
    )
}

export { gamma }

export default Spectrogram;