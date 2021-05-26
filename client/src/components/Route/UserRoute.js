import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/user/home/Home";

function UserRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  );
}

export default UserRoute;
