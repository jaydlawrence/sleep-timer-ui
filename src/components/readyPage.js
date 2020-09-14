import React from 'react';
import { MarginedButton } from './marginedButton';
import { SleepUntil } from './sleepUntil';
import { NapFor } from './napFor';
import moment from 'moment';

// router
import {
  useRouteMatch,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export const ReadyPage = ({ getAndUpdateState }) => {
  let match = useRouteMatch();

  return (
    <>
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
    </>
  );
}