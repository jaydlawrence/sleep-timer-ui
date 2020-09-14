import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import moment from 'moment';
import { formatTimeDiff, formatTimeToFriendly } from '../utlis';
import { postResetDevice } from '../requests';
import { MarginedButton } from './marginedButton';
import { CircularProgress } from '@material-ui/core';
import { HTTP_ERROR_MESSAGE } from '../constants';

export const DonePage = ({ appState, getAndUpdateState }) => {
  const { endTime } = appState;
  const momentedEndTime = moment.unix(endTime);
  const [currentTime, setCurrentTime] = useState(moment());
  const [isResetLoading, setIsResetLoading] = useState(false);
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
      () => {
        setCurrentTime(moment());
      },
      15000 // 15 seconds, to keep the count down relatively up to date
    );
    return () => clearInterval(interval2);
  }, []);

  const reset = async () => {
    setIsResetLoading(true);
    const result = await postResetDevice();
    await getAndUpdateState();
    setIsResetLoading(false);
    if (result.error) setError(HTTP_ERROR_MESSAGE);
  }

  return (
    <>
      <p css={{ color: 'red' }}>{error}</p>
      <p>
        {`Wake time was ${formatTimeDiff(currentTime, momentedEndTime)} ago at ${formatTimeToFriendly(momentedEndTime)}`}
      </p>
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
    </>
  )
}