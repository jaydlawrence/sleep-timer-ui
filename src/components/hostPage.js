import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// constants
import { APP_STATE_INITIALIZING, URL_STUB_READY, URL_STUB_TIMING, URL_STUB_INITIALIZING, URL_STUB_DONE, URL_STUB_ERROR, APP_STATE_TIMING, APP_STATE_DONE, APP_STATE_READY, APP_STATE_ERROR } from '../constants';
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
import { DonePage } from './donePage';
import { ErrorPage } from './errorPage';


export const HostPage = () => {
  const history = useHistory();
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

  const backgroundStyles = {
    textAlign: 'center',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    ...(appState.state === APP_STATE_INITIALIZING && {
      background: 'linear-gradient(#e3ac59, #619cc9 30%)'
    }),
    ...(appState.state === APP_STATE_READY && {
      background: 'linear-gradient(#e3ac59, #619cc9 30%)'
    }),
    ...(appState.state === APP_STATE_TIMING && {
      background: 'linear-gradient(#188cba, #3f4496 30%)'
    }),
    ...(appState.state === APP_STATE_DONE && {
      background: 'linear-gradient(#f9ff82, #82fdff 30%)'
    }),
    ...(appState.state === APP_STATE_ERROR && {
      background: 'linear-gradient(#cc2f2f, #fc9090 30%)'
    })
  }

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
  const appContentStyles = {
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
    <div css={backgroundStyles} >
      <header css={appHeaderStyles}>
        <h2>
          Sleep Timer
        </h2>
      </header>
      <div css={appContentStyles}>
        <Switch>
          <Route path={URL_STUB_READY}>
            <ReadyPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_TIMING}>
            <TimingPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_DONE}>
            <DonePage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_ERROR}>
            <ErrorPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={URL_STUB_INITIALIZING}>
            <InitializingPage appState={appState} getAndUpdateState={getAndUpdateState} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}