import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../screens/Signup';
import Term from '../screens/Term';
import CreateOffer from '../screens/Offer/Create';
import EditUser from '../screens/EditUser';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/termo" component={Term} />
      <Route exact path="/oferta/cadastro" component={CreateOffer} />
      <Route exact path="/usuario/editar" component={EditUser} />
    </Switch>
  </Router>
);

export default Routes;
