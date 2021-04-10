import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../screens/Signup';
import Term from '../screens/Term';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/termo" component={Term} />
    </Switch>
  </Router>
);

export default Routes;
