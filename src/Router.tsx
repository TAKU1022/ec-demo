import { VFC } from 'react';
import { Route, Switch } from 'react-router';
import { Home, Login, SignUp } from './templates';

const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Router;
