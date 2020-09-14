import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// constants
import { APP_STATE_INITIALIZING, URL_STUB_READY, URL_STUB_TIMING, URL_STUB_INITIALIZING } from '../constants';
// API calls
import { getDeviceState, postResetDevice, postSetPeriod, postSetEndTime } from '../requests';
// components
import { InitializingPage } from './initializingPage';
import { ReadyPage } from './readyPage';
// router
import {
  useHistory,
  Switch,
  Route
} from 'react-router-dom';
import { pushToCorrectPageOnLoad } from '../utlis';
import { TimingPage } from './timingPage';


export const HostPage = () => {
  const history = useHistory();
  //TODO incorporate whole state object from server
  const [appState, setAppState] = useState({ state: APP_STATE_INITIALIZING });

  const getAndUpdateState = async () => {
    const fetchedState = await getDeviceState();
    setAppState(fetchedState);
  };

  useEffect(() => {
    getAndUpdateState();
  }, []);

  useEffect(() => {
    console.log("HostPage -> useEffect state.state");
    pushToCorrectPageOnLoad(appState.state, history);
  }, [appState.state]);

  const appHeaderStyles = {
    // backgroundColor: '#282c34',
    minHeight: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'black'
  }
  const appBodyStyles = {
    // backgroundColor: '#282c34',
    minHeight: '30vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'black'
  }

  return (
    <div css={{ textAlign: 'center' }}>
      <header css={appHeaderStyles}>
        <h2>
          Sleep Timer
        </h2>
      </header>
      <div css={appBodyStyles}>
        <Switch>
          <Route path={URL_STUB_READY}>
            <ReadyPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_TIMING}>
            <TimingPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_INITIALIZING}>
            <InitializingPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}