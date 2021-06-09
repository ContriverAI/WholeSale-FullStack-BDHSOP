import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/admin/dashboard/Dashboard";
import DetailItem from "../../pages/admin/detailItem/DetailItem";
import Home from "../../pages/admin/home/Home";
import OrderDetail from "../../pages/admin/orderDetail/OrderDetail";
import ManageOrder from "../../pages/admin/orders/ManageOrder";
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
      <AdminAuthRoute exact path="/admin/:itemId" component={DetailItem} />
      <AdminAuthRoute exact path="/manage-order" component={ManageOrder} />
      <AdminAuthRoute
        exact
        path="/order-details/:itemId"
        component={OrderDetail}
      />
    </Switch>
  );
}

export default AdminRoute;
