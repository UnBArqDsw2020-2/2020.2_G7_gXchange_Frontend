import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Signup from '../screens/Signup';
import Term from '../screens/Term';
import CreateOffer from '../screens/Offer/Create';
import ShowOffer from '../screens/Offer/Show';
import EditUser from '../screens/EditUser';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/termo" component={Term} />
      <Route exact path="/oferta/cadastro" component={CreateOffer} />
      <Route exact path="/oferta/visualizar" component={ShowOffer} />
      <Route exact path="/usuario/editar" component={EditUser} />

      <Redirect to="/" />
    </Switch>
  </Router>
);

export const BeforeLoginRoutes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/termo" component={Term} />
      <Route exact path="/cadastro" component={Signup} />
      <Route path={['/', '/login']} component={Login} />

      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default Routes;
