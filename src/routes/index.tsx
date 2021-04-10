import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../screens/Signup';
import CreateOffer from '../screens/Offer/Create';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/oferta/cadastro" component={CreateOffer} />
    </Switch>
  </Router>
);

export default Routes;
