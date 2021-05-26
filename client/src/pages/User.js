import React from "react";
import UserNavigation from "../components/UserNavigation/UserNavigation";

function User({ children }) {
  return (
    <>
      <UserNavigation />
      {children}
    </>
  );
}

export default User;
