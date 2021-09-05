import { VFC } from 'react';
import { Route, Switch } from 'react-router';
import Auth from '../Auth';
import { ProductEdit, ProductList, Reset, SignIn, SignUp } from '../templates';

const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset}></Route>

      <Auth>
        <Route exact path="/" component={ProductList} />
        <Route path="/product/edit/(:id)?" component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
