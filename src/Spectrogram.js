import React from 'react'
import { Slider, Typography } from '@material-ui/core'

var gamma = 1;

const Spectrogram = () => {
    return (
        <React.Fragment>
            <Typography className="controlTitle" gutterBottom>gamma</Typography>
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
        </React.Fragment>
    )
}

export { gamma }

export default Spectrogram;