
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import { MarginedButton } from './marginedButton';
import { formatPeriodToFriendlyMessage } from '../utlis';
import moment from 'moment';
// router
import { Link } from 'react-router-dom';
import { InputLabel, Select, MenuItem, FormControl, CircularProgress } from '@material-ui/core';
// requests
import { postSetPeriod } from '../requests';
import { URL_STUB_INITIALIZING } from '../constants';

export const NapFor = ({ getAndUpdateState }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState(0);
  const [currentTime, setCurrentTime] = useState(moment());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setPeriod(minutes * 60 + hours * 3600);
  }, [hours, minutes]);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(moment()),
      15000 // 15 seconds, to keep the displayed date relatively up to date
    );
    return () => clearInterval();
  }, []);

  const inputContainerStyles = {
    margin: '25px 0',
    minWidth: 120
  }
  const inputStyles = {
    minWidth: 120
  }

  const submitNap = async () => {
    setIsLoading(true);
    const result = await postSetPeriod(period);
    await getAndUpdateState();
    setIsLoading(false);
    if (result.error) setError('There was a problem with contacting the device, please try again.');
  }

  return (
    <>
      <div css={inputContainerStyles}>
        <FormControl style={inputStyles}>
          <InputLabel id="hours-select-label">Hours</InputLabel>
          <Select
            labelId="hours-select-label"
            onChange={element => setHours(element?.target?.value)}
          >
            <MenuItem value="" >0</MenuItem>
            <MenuItem value="1" >1</MenuItem>
            <MenuItem value="2" >2</MenuItem>
            <MenuItem value="3" >3</MenuItem>
            <MenuItem value="4" >4</MenuItem>
            <MenuItem value="5" >5</MenuItem>
            <MenuItem value="6" >6</MenuItem>
            <MenuItem value="7" >7</MenuItem>
            <MenuItem value="8" >8</MenuItem>
            <MenuItem value="9" >9</MenuItem>
            <MenuItem value="10" >10</MenuItem>
            <MenuItem value="11" >11</MenuItem>
            <MenuItem value="12" >12</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div css={inputContainerStyles}>
        <FormControl style={inputStyles}>
          <InputLabel id="minutes-select-label">Minutes</InputLabel>
          <Select
            labelId="minutes-select-label"
            onChange={element => setMinutes(element?.target?.value)}
          >
            <MenuItem value="" >0</MenuItem>
            <MenuItem value="5" >5</MenuItem>
            <MenuItem value="10" >10</MenuItem>
            <MenuItem value="15" >15</MenuItem>
            <MenuItem value="20" >20</MenuItem>
            <MenuItem value="25" >25</MenuItem>
            <MenuItem value="30" >30</MenuItem>
            <MenuItem value="35" >35</MenuItem>
            <MenuItem value="40" >40</MenuItem>
            <MenuItem value="45" >45</MenuItem>
            <MenuItem value="50" >50</MenuItem>
            <MenuItem value="55" >55</MenuItem>
          </Select>
        </FormControl>
      </div>
      <p css={{ color: 'red' }}>{error}</p>
      <p css={{ margin: '25px 15px' }} >
        {
          period ?
            `${formatPeriodToFriendlyMessage({ period, hours, minutes, currentTime })}?` :
            'Select the amount of time to nap for'
        }
      </p>
      {
        !isLoading &&
        <MarginedButton
          variant="contained"
          disabled={!period}
          onClick={submitNap}
        >
          Nap
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