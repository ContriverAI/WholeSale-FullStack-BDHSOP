import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminAuthRoute({ component, ...rest }) {
  const Component = component;
  const state = localStorage.getItem("BDshopAdmin");
  //   const user = useSelector((state) => state.User);

  return (
    <Route
      {...rest}
      render={(props) =>
        state ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
}

export default AdminAuthRoute;
