import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/user/dashboard/Dashboard";
import Home from "../../pages/user/home/Home";
import UserProducts from "../../pages/user/userProducts/UserProducts";
import UserAuthRoute from "./UserAuthRoute";

function UserRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <UserAuthRoute exact path="/home" component={Dashboard} />
      <UserAuthRoute exact path="/products" component={UserProducts} />
    </Switch>
  );
}

export default UserRoute;
