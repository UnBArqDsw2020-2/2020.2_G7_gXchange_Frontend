import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Signup from '../screens/Signup';
import CreateOffer from '../screens/Offer/Create';
import EditUser from '../screens/EditUser';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/oferta/cadastro" component={CreateOffer} />
      <Route exact path="/usuario/editar" component={EditUser} />

      <Redirect to="/" />
    </Switch>
  </Router>
);

export const BeforeLoginRoutes: React.FC = () => (
  <Router>
    <Switch>
      <Route path={['/', '/login']} component={Login} />
      <Route exact path="/cadastro" component={Signup} />

      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default Routes;
