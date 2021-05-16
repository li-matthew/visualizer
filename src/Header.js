import React from 'react';
import { Button } from '@material-ui/core'

const Header = ({ controlAudio }) => {
    return (
        <div class="Header">
            <Button id='butt' variant='outlined' color='secondary' onClick={controlAudio.toggleAudio}>
                {controlAudio.audio ? 'stop' : 'begin'}
            </Button>
        </div>
    );
}

export default Header