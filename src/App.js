import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { APP_STATE_INITIALIZING } from './constants';
import { getDeviceState, postResetDevice, postSetPeriod, postSetEndTime } from './requests';

const App = () => {
  //TODO incorporate whole state object from server
  const [state, setState] = useState(APP_STATE_INITIALIZING);
  useEffect(() => {
    const deviceState = getDeviceState();
    setState(getDeviceState());
    // postResetDevice();
    // postSetPeriod(1000);
    // postSetEndTime(1599782964);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
