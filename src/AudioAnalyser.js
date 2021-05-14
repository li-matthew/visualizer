import React, { useEffect, useRef, createRef, useLayoutEffect } from "react";
import AudioVisualiser from "./AudioVisualiser";

const AudioAnalyser = ({ stream }) => {
  // const [oAudioData, setOAudioData] = React.useState(new Uint8Array(0));
  // tick = tick.bind(this);
  // const [bAudioData, setBAudioData] = React.useState(new Uint8Array(0));
  const [audioData, setAudioData] = React.useState(new Uint8Array(0));

  var audioContext = useRef(new AudioContext());
  var analyser = useRef();
  // var dataArray = useRef();
  var source = useRef();
  var rafId = useRef();

  useEffect(() => {
    if (stream) {
      console.log("init stream");
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 4096;
      analyser.current.smoothingTimeConstant = 0;
      // filter = audioContext.createBiquadFilter()
      // filter.type = "lowpass"
      // filter.frequency.value = 10000;
      // filter.gain.value = 1;
      // dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
      // setOAudioData(new Uint8Array(analyser.current.fftSize));
      // setBAudioData(new Uint8Array(analyser.current.fftSize));
      setAudioData(new Uint8Array(analyser.current.fftSize));
      source.current = audioContext.current.createMediaStreamSource(stream);
      source.current.connect(analyser.current);
      // filter.connect(audioContext.destination)
      // rafId.current = requestAnimationFrame(tick);
    } else {
      console.log("no stream");
    }
    return () => {
      console.log("cancel animation");
      cancelAnimationFrame(rafId.current);
      analyser.current.disconnect();
      source.current.disconnect();
    };
  }, [stream]);

  useLayoutEffect(() => {
    
    const tick = () => {
      var audioData = new Uint8Array(analyser.current.fftSize);
      analyser.current.getByteTimeDomainData(audioData);
      setAudioData(audioData)
      // console.log('tick');
      // var oAudioData = new Uint8Array(analyser.current.fftSize);
      // var bAudioData = new Uint8Array(analyser.current.fftSize);
      // analyser.current.getByteTimeDomainData(oAudioData);
      // analyser.current.getByteFrequencyData(bAudioData);
      // console.log(dataArray.current)
      // setOAudioData(oAudioData);
      // setBAudioData(bAudioData);
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, [])
  return (
    <div class="Vis">
      <AudioVisualiser audioData={audioData} />
    </div>
  );
};

export default AudioAnalyser;
