import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/admin/login/Login";

function AdminRoute() {
  return (
    <Switch>
      <Route exact path="/admin" component={Login}></Route>
    </Switch>
  );
}

export default AdminRoute;
