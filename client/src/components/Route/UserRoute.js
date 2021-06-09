import React from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "../../pages/user/cart/Cart";
import Dashboard from "../../pages/user/dashboard/Dashboard";
import Home from "../../pages/user/home/Home";
import Orders from "../../pages/user/orders/Orders";
import UserProducts from "../../pages/user/userProducts/UserProducts";
import UserAuthRoute from "./UserAuthRoute";

function UserRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <UserAuthRoute exact path="/home" component={Dashboard} />
      <UserAuthRoute exact path="/products" component={UserProducts} />
      <UserAuthRoute exact path="/cart" component={Cart} />
      <UserAuthRoute exact path="/orders" component={Orders} />
    </Switch>
  );
}

export default UserRoute;
