import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/admin/home/Home";

function AdminRoute() {
  return (
    <Switch>
      <Route exact path="/admin" component={Home}></Route>
    </Switch>
  );
}

export default AdminRoute;
