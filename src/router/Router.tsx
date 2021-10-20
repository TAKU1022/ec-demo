import { VFC } from 'react';
import { Route, Switch } from 'react-router';
import Auth from '../Auth';
import {
  CartList,
  OrderComplete,
  OrderConfirm,
  OrderHistory,
  ProductDetail,
  ProductEdit,
  ProductList,
  Reset,
  SignIn,
  SignUp,
} from '../templates';

const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset}></Route>

      <Auth>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route path="/product/edit/(:id)?" component={ProductEdit} />
        <Route exact path="/cart" component={CartList} />
        <Route exact path="/order/confirm" component={OrderConfirm} />
        <Route exact path="/order/history" component={OrderHistory} />
        <Route exact path="/order/complete" component={OrderComplete} />
      </Auth>
    </Switch>
  );
};

export default Router;
