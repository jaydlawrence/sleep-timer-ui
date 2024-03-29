import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import { MarginedButton } from './marginedButton';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { formatTimeToFriendly } from '../utlis';
// router
import { Link } from 'react-router-dom';
import { HTTP_ERROR_MESSAGE, URL_STUB_READY } from '../constants';
import { postSetEndTime } from '../requests';
import { CircularProgress } from '@material-ui/core';

const getNextTime = (time) => {
  if (time.isBefore(moment())) return moment(time).add(1, 'day');
  return time;
};

const initialTime = moment();
initialTime.set('hour', 7);
initialTime.set('minute', 0);
initialTime.set('second', 0);

export const SleepUntil = ({ getAndUpdateState }) => {
  const [pickerTime, setPickerTime] = useState(initialTime);
  const [time, setTime] = useState(getNextTime(initialTime));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const modifyAndSaveTime = (newTime) => {
    return setPickerTime(newTime);
  };

  const submitSleep = async () => {
    setIsLoading(true);
    const result = await postSetEndTime(time.unix());
    await getAndUpdateState();
    setIsLoading(false);
    if (result.error) setError(HTTP_ERROR_MESSAGE);
  };

  useEffect(() => {
    setTime(getNextTime(pickerTime));
  }, [pickerTime]);

  return (
    <>
      <div css={{ margin: '25px 0' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker value={pickerTime} onChange={modifyAndSaveTime} />
        </MuiPickersUtilsProvider>
      </div>
      <p css={{ color: 'red' }}>{error}</p>
      <p css={{ margin: '25px 0' }}>{`Sleep until ${formatTimeToFriendly(
        time
      )}?`}</p>
      {!isLoading && (
        <MarginedButton variant="contained" onClick={submitSleep}>
          Sleep
        </MarginedButton>
      )}
      {isLoading && (
        <div css={{ margin: '21px 0' }}>
          <CircularProgress />
        </div>
      )}
      <Link style={{ textDecoration: 'none' }} to={URL_STUB_READY}>
        <MarginedButton variant="contained">Back</MarginedButton>
      </Link>
    </>
  );
};
