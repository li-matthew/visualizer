import React from 'react'
import { Slider, Typography } from '@material-ui/core'

var thickness = 1;

const Oscilloscope = () => {
    return (
        <div>
            <Typography class="controlTitle" gutterBottom color='inherit'>thickness</Typography>
            <Slider id='thickness'
                min={0}
                max={10}
                step={0.1}
                defaultValue={1}
                valueLabelDisplay='auto'
                color='secondary'
                onChange={(event, value) => {
                    thickness = value;
                }}
            />
            
        </div>
    )
}

export { thickness }

export default Oscilloscope;