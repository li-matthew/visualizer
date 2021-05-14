import React, { useEffect } from 'react';
import AudioAnalyser from './AudioAnalyser';
import ControlBar from './ControlBar';
import { getTokenFromUrl } from './spotify';
import Login from './Login';
import SpotifyWebApi from 'spotify-web-api-js';
import Info from './Info';
import './App.css';

const spotify = new SpotifyWebApi({
  clientId: '6d21bc23eaeb4573a2b668d8239e57ea',
  // clientSecret: 'e5dffd480c28448b85c9633cfc868f9e',
  redirectUri: 'http://localhost:3000/callback/'
});

const App = (props) => {
  const [audio, setAudio] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [token, setToken] = React.useState();

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

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }
  }, [])

  return (
    <div className="App">
      {token ? <a>LOGGED IN</a> : <Login />}
      <Info spotify={spotify} />
      <ControlBar controlAudio={{ audio, toggleAudio }} />
      {audio ? <AudioAnalyser stream={audio} /> : ''}
    </div>
  );
}

export default App;
