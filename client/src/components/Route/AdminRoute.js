import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/admin/dashboard/Dashboard";
import Home from "../../pages/admin/home/Home";
import AdminAuthRoute from "./AdminAuthRoute";

function AdminRoute() {
  return (
    <Switch>
      <Route exact path="/admin" component={Home}></Route>
      <AdminAuthRoute
        exact
        path="/admin-dashboard"
        component={Dashboard}
      ></AdminAuthRoute>
    </Switch>
  );
}

export default AdminRoute;
