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
import { URL_STUB_INITIALIZING } from '../constants';

export const SleepUntil = ({ getAndUpdateState }) => {
  const [time, setTime] = useState(moment().add(1, 'hour'));

  const modifyAndSaveTime = newTime => {
    if (newTime.isBefore(moment())) return setTime(newTime.add(1, 'day'));
    return setTime(newTime);
  }

  return (
    <>
      <div css={{ margin: '25px 0' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker value={time} onChange={modifyAndSaveTime} />
        </MuiPickersUtilsProvider>
      </div>
      <p css={{ margin: '25px 0' }} >{`Sleep until ${formatTimeToFriendly(time)}?`}</p>
      <MarginedButton variant="contained">Sleep</MarginedButton>
      <Link style={{ textDecoration: 'none' }} to={URL_STUB_INITIALIZING}>
        <MarginedButton variant="contained">Back</MarginedButton>
      </Link>
    </>
  )
}