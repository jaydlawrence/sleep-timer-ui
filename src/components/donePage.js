import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import moment from 'moment';
import { formatTimeDiff, formatTimeToFriendly } from '../utlis';

export const DonePage = ({ appState, getAndUpdateState }) => {
  const { endTime } = appState;
  const momentedEndTime = moment.unix(endTime);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(
      () => {
        getAndUpdateState();
      },
      300000 // 300 seconds, to keep in contact with device
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(moment());
      },
      15000 // 15 seconds, to keep the count down relatively up to date
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>
        {`Sleep time ended ${formatTimeDiff(currentTime, momentedEndTime)} ago at ${formatTimeToFriendly(momentedEndTime)}`}
      </p>
    </>
  )
}