import React from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import { MarginedButton } from './marginedButton';
import { SleepUntil } from './sleepUntil';
import { NapFor } from './napFor';

// router
import {
  useRouteMatch,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Moon } from './moon';
import { Sun } from './sun';

export const ReadyPage = ({ getAndUpdateState }) => {
  let match = useRouteMatch();

  return (
    <>
      <div css={{ zIndex: 100 }}>
        <Switch>
          <Route path={`${match.path}/sleep-until`}>
            <SleepUntil getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={`${match.path}/nap-for`}>
            <NapFor getAndUpdateState={getAndUpdateState} />
          </Route>
          <Route path={match.path}>
            <Link style={{ textDecoration: 'none' }} to={`${match.url}/sleep-until`}>
              <MarginedButton variant="contained">Sleep until</MarginedButton>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={`${match.url}/nap-for`}>
              <MarginedButton variant="contained">Nap for</MarginedButton>
            </Link>
          </Route>
        </Switch>
      </div>
      <div css={{
        position: 'absolute',
        top: '50%',
        left: '0%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <Moon />
      </div>
      <div css={{
        position: 'absolute',
        top: '50%',
        left: '100%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <Sun />
      </div>
    </>
  );
}