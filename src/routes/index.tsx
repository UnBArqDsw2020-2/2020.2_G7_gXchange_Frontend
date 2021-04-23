import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../screens/Signup';
import CreateOffer from '../screens/Offer/Create';
import ShowOffer from '../screens/Offer/Show';
import EditUser from '../screens/EditUser';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/cadastro" component={Signup} />
      <Route exact path="/oferta/cadastro" component={CreateOffer} />
      <Route exact path="/oferta/visualizar" component={ShowOffer} />
      <Route exact path="/usuario/editar" component={EditUser} />
    </Switch>
  </Router>
);

export default Routes;
