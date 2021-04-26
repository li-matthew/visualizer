import React, { useEffect, useRef, createRef } from 'react';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyser = ({ stream }) => {
    const [audioData, setAudioData] = React.useState(new Uint8Array(0));
    // tick = tick.bind(this);
    
    var audioContext = useRef(new AudioContext());
    var analyser = useRef();
    // var dataArray = useRef();
    var source = useRef();
    var rafId = useRef();


  useEffect (() => {
    if (stream) {
      // console.log('init stream')
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 1024
      // .filter = audioContext.createBiquadFilter()
      // filter.type = "lowpass"
      // filter.frequency.value = 10000;
      // filter.gain.value = 1;
      // dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
      setAudioData(new Uint8Array(analyser.current.fftSize))
      source.current = audioContext.current.createMediaStreamSource(stream);
      source.current.connect(analyser.current);
      // filter.connect(audioContext.destination)
      
      rafId.current = requestAnimationFrame(tick);
    }
    return () => {
      console.log('cancel animation')
      cancelAnimationFrame(rafId.current);
      analyser.current.disconnect();
      source.current.disconnect();
    }
  }, [stream])

  const tick = () => {
    // console.log('tick');
    var byteData = new Uint8Array(analyser.current.fftSize);
    analyser.current.getByteTimeDomainData(byteData);
    // console.log(dataArray.current)
    setAudioData(byteData);
    rafId.current = requestAnimationFrame(tick);
    
  }

  return (
     <AudioVisualiser audioData={audioData}/>
  )
}

export default AudioAnalyser;
