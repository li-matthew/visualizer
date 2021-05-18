import React, { useRef, useLayoutEffect } from "react";
import AudioVisualiser from "./AudioVisualiser";
import { smoothing, fft, tab } from './ControlBar';

const AudioAnalyser = ({ stream }) => {
  const [audioData, setAudioData] = React.useState(new Uint8Array(0));

  var audioContext = useRef(new AudioContext());
  var analyser = useRef();
  var source = useRef();
  var rafId = useRef();

  useLayoutEffect(() => {
    if (stream) {
      console.log("init stream");
      audioContext.current.resume();
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = fft;
      analyser.current.smoothingTimeConstant = smoothing;
      setAudioData(new Uint8Array(analyser.current.fftSize));
      source.current = audioContext.current.createMediaStreamSource(stream);
      source.current.connect(analyser.current);
    } else {
      console.log("no stream");
    }
    return () => {
      console.log("cancel animation");
      cancelAnimationFrame(rafId.current);
      audioContext.current.suspend();
      // analyser.current.disconnect();
      // source.current.disconnect();
    };
  }, [stream]);

  useLayoutEffect(() => {
    const tick = () => {
      var audioData = new Uint8Array(analyser.current.fftSize);
      if (tab === 'oscilloscope') {
        analyser.current.getByteTimeDomainData(audioData);
      } else {
        analyser.current.getByteFrequencyData(audioData);
      }
      setAudioData(audioData)
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, [])
  return (
    <React.Fragment>
      <AudioVisualiser audioData={audioData} />
    </React.Fragment>
  );
};

export default AudioAnalyser;
