import React, { useState } from 'react'
import Countdown from 'react-countdown';

export default function MyCountdownTimer({ times }) {
  // a hook for the current time index
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  // a hook for the current time
  const [currentTime, setCurrentTime] = useState(null);
  // return a render
  return (
      <Countdown
          date={currentTime}
          key={currentTimeIndex}
          onComplete={() => {
              // dont's move to next time if just done with last time
              if(times.length - 1 <= times.indexOf(currentTime)) return;
              // move to next time index
              setCurrentTimeIndex(currentTimeIndex + 1);
              // reset current time
              setCurrentTime(new Date(times[currentTimeIndex + 1]));
          }}
          renderer={({ hours, minutes, seconds, completed }) => {
              // render completed
              if (completed) return <span>You are good to go!</span>;
              // render current countdown time
              return <span>{hours}:{minutes}:{seconds}</span>;

          }}
      />
  );
}
