import React from 'react';
// components
import { HostPage } from './components/hostPage';
// router
import {
  BrowserRouter as Router,
} from 'react-router-dom';

const App = () => (
  <Router>
    <HostPage />
  </Router>
);

export default App;
