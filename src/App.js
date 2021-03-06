import React, { useEffect } from 'react';
import AudioAnalyser from './AudioAnalyser';
import Header from './Header';
import ControlBar from './ControlBar'
import { getTokenFromUrl } from './spotify';
import { Typography } from '@material-ui/core'
import Login from './Login';
import SpotifyWebApi from 'spotify-web-api-js';
import Info from './Info';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF01D7',
      contrastText: '#FFEB00'
    },
    secondary: {
      main: '#00EDF5',
    }
  },
  typography: {
    fontFamily: 'Trip',
    body1: {
      color: "#FFEB00"
    },
    h3: {
      padding: 10
    }
  },
  overrides: {
    MuiTab: {
      textColorPrimary: {
        color: '#FFEB00'
      },
      root: {
        fontSize: 18
      }
    },
    MuiSwitch: {
      switchBase: {
        color: '#5600CC'
      }
    },
    MuiRadio: {
      root: {
        color: '#5600CC'
      }
    },
    MuiSlider: {
      mark: {
        color: '#FFEB00'
      }
    }
  }
});

// const spotify = new SpotifyWebApi({
//   clientId: '6d21bc23eaeb4573a2b668d8239e57ea',
//   redirectUri: 'http://localhost:3000/callback/'
// });

const App = (props) => {
  const [audio, setAudio] = React.useState(null);
  // const [token, setToken] = React.useState();
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

  // useEffect(() => {
  //   const hash = getTokenFromUrl();
  //   window.location.hash = "";
  //   const _token = hash.access_token;
  //   if (_token) {
  //     setToken(_token);
  //     spotify.setAccessToken(_token);
  //   }
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Typography className='title' variant='h3'>sandwich time</Typography>
        {/* {token ? <a>LOGGED IN</a> : <Login />}
      <Info spotify={spotify} /> */}
        <Header controlAudio={{ audio, toggleAudio }} />
          {audio ? <AudioAnalyser stream={audio} /> : ''}
        <ControlBar controlAudio={{ audio, toggleAudio }} />
      </div>
    </ThemeProvider>
  );
}

export default App;
