import React from 'react';

const ControlBar = ({ controlAudio }) => {
  return (
    <div class="ControlBar">
      <button onClick={controlAudio.toggleAudio}>
        {controlAudio.audio ? 'Stop' : 'Begin'}
      </button>
      <input type="range" min="0" max="100" class="controls" id="opacity"></input>
    </div>
  );
}

export default ControlBar