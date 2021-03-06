import React from "react";
import { Route, Redirect } from "react-router-dom";

function UserAuthRoute({ component, ...rest }) {
  const Component = component;
  const state = localStorage.getItem("BDshopUser");
  //   const user = useSelector((state) => state.User);

  return (
    <Route
      {...rest}
      render={(props) =>
        state ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default UserAuthRoute;
