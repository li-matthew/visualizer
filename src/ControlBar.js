import React from 'react';

const ControlBar = ({ controlAudio }) => {
    // const [isPlaying, setIsPlaying] = React.useState(false);

    // useEffect(() => {
    //     if (isPlaying) {

    //     }
    // }, [isPlaying])

    return (
        <div className="controls">
          <button onClick={controlAudio.toggleAudio}>
            {controlAudio.audio ? 'Stop' : 'Begin'}
          </button>
        </div>
    );
}

export default ControlBar