import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { pushToCorrectPageOnLoad } from '../utlis';

// router
import { useHistory } from 'react-router-dom';

export const InitializingPage = ({ appState }) => {
  const history = useHistory();
  useEffect(() => {
    pushToCorrectPageOnLoad(appState.state, history);
  }, [appState.state]);
  return (
    <>
      <p>
        Initializing App...
              </p>
      <CircularProgress />
    </>
  )
};