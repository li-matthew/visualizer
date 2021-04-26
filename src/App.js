import React from 'react';
import AudioAnalyser from './AudioAnalyser';
import ControlBar from './ControlBar';

const App = (props) => {
  const [audio, setAudio] = React.useState(null);

  const getAudio = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio);
  }

  const stopAudio = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  }


  const toggleAudio = () => {
      if (audio) {
        stopAudio();
      } else {
        getAudio();
      }
  }


    return (
      <div className="App">
        <ControlBar controlAudio={{audio, toggleAudio}}/>
        {audio ? <AudioAnalyser stream={audio} /> : ''}
      </div>
    );
}

export default App;
