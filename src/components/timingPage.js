import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import moment from 'moment';
import { formatTimeToFriendly, formatTimeDiff } from '../utlis';
import { LinearProgress, CircularProgress } from '@material-ui/core';
import { MarginedButton } from './marginedButton';
import { postSetWakeNow, postResetDevice, postSetEndTime } from '../requests';
import { HTTP_ERROR_MESSAGE } from '../constants';
import { Moon } from './moon';

export const TimingPage = ({ appState, getAndUpdateState }) => {
  const { endTime, startTime } = appState;
  const momentedEndTime = moment.unix(endTime);
  const momentedStartTime = moment.unix(startTime);
  const [currentTime, setCurrentTime] = useState(moment());
  const percentageComplete = currentTime.diff(momentedStartTime, 'seconds') * 100 / momentedEndTime.diff(momentedStartTime, 'seconds');

  const [isWakeNowLoading, setIsWakeNowLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isGetStateLoading, setIsGetStateLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const interval1 = setInterval(
      () => {
        getAndUpdateState();
      },
      300000 // 300 seconds, to keep in contact with device
    );
    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    const interval2 = setInterval(
      async () => {
        const now = moment();
        setCurrentTime(moment());
        if (now.diff(momentedEndTime) > 0 && !isGetStateLoading) {
          setIsGetStateLoading(true);
          await getAndUpdateState();
          setIsGetStateLoading(false);
        }
      },
      1000 // 1 second, to keep the count down relatively up to date
    );
    return () => clearInterval(interval2);
  }, []);

  const wakeNow = async () => {
    setIsWakeNowLoading(true);
    const result = await postSetWakeNow();
    await getAndUpdateState();
    setIsWakeNowLoading(false);
    if (result.error) setError(HTTP_ERROR_MESSAGE);
  }

  const reset = async () => {
    setIsResetLoading(true);
    const result = await postResetDevice();
    await getAndUpdateState();
    setIsResetLoading(false);
    if (result.error) setError(HTTP_ERROR_MESSAGE);
  }

  return (
    <>
      <div css={{ zIndex: 100 }}>
        <div css={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={percentageComplete} />
        </div>
        <p css={{ color: 'red' }}>{error}</p>
        <p>
          {`Wake up time will be in ${formatTimeDiff(momentedEndTime, currentTime)} at ${formatTimeToFriendly(momentedEndTime)}`}
        </p>
        {
          !isWakeNowLoading &&
          <MarginedButton
            variant="contained"
            onClick={wakeNow}
          >
            Wake Now
        </MarginedButton>
        }
        {
          isWakeNowLoading &&
          <div css={{ margin: '21px 0' }}>
            <CircularProgress />
          </div>
        }
        {
          !isResetLoading &&
          <MarginedButton
            variant="contained"
            onClick={reset}
          >
            Reset
        </MarginedButton>
        }
        {
          isResetLoading &&
          <div css={{ margin: '21px 0' }}>
            <CircularProgress />
          </div>
        }
      </div>
      <div css={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <Moon />
      </div>

    </>
  )
}