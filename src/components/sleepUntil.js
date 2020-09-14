import React, { useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import { MarginedButton } from './marginedButton';
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { formatTimeToFriendly } from '../utlis';
// router
import { Link } from 'react-router-dom';
import { URL_STUB_INITIALIZING, HTTP_ERROR_MESSAGE } from '../constants';
import { postSetEndTime } from '../requests';
import { CircularProgress } from '@material-ui/core';

export const SleepUntil = ({ getAndUpdateState }) => {
  const [time, setTime] = useState(moment().add(1, 'hour'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const modifyAndSaveTime = newTime => {
    if (newTime.isBefore(moment())) return setTime(newTime.add(1, 'day'));
    return setTime(newTime);
  }

  const submitSleep = async () => {
    setIsLoading(true);
    const result = await postSetEndTime(time.unix());
    await getAndUpdateState();
    setIsLoading(false);
    if (result.error) setError(HTTP_ERROR_MESSAGE);
  }

  return (
    <>
      <div css={{ margin: '25px 0' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker value={time} onChange={modifyAndSaveTime} />
        </MuiPickersUtilsProvider>
      </div>
      <p css={{ color: 'red' }}>{error}</p>
      <p css={{ margin: '25px 0' }} >{`Sleep until ${formatTimeToFriendly(time)}?`}</p>
      {
        !isLoading &&
        <MarginedButton
          variant="contained"
          onClick={submitSleep}
        >
          Sleep
        </MarginedButton>
      }
      {
        isLoading &&
        <div css={{ margin: '21px 0' }}>
          <CircularProgress />
        </div>
      }
      <Link style={{ textDecoration: 'none' }} to={URL_STUB_INITIALIZING}>
        <MarginedButton variant="contained">Back</MarginedButton>
      </Link>
    </>
  )
}