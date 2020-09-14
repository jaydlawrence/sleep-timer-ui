import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import moment from 'moment';
import { formatTimeToFriendly, formatTimeDiff } from '../utlis';
import { LinearProgress } from '@material-ui/core';

export const TimingPage = ({ appState, getAndUpdateState }) => {
  const { endTime, startTime } = appState;
  const momentedEndTime = moment.unix(endTime);
  const momentedStartTime = moment.unix(startTime);
  const [currentTime, setCurrentTime] = useState(moment());
  const percentageComplete = currentTime.diff(momentedStartTime, 'seconds') * 100 / momentedEndTime.diff(momentedStartTime, 'seconds');


  useEffect(() => {
    const interval = setInterval(
      () => {
        getAndUpdateState();
      },
      300000 // 300 seconds, to keep in contact with device
    );
    return () => clearInterval();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(moment());
      },
      15000 // 15 seconds, to keep the count down relatively up to date
    );
    return () => clearInterval();
  }, []);

  useEffect(() => {
    const secondsLeft = momentedEndTime.diff(moment(), 'seconds');
    const interval = setInterval(
      () => {
        setCurrentTime(moment());
        getAndUpdateState();
      },
      secondsLeft * 1000 + 1000 // wait until 1 second after the end time to get the status returned to be done
    );
    return () => clearInterval();
  }, [endTime]);

  return (
    <>
      <div css={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={percentageComplete} />
      </div>
      <p>
        {`Wake up time will be in ${formatTimeDiff(momentedEndTime, currentTime)} at ${formatTimeToFriendly(momentedEndTime)}`}
      </p>
    </>
  )
}