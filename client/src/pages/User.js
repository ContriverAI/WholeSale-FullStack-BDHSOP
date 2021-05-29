import React from "react";
import { useDispatch } from "react-redux";
import UserNavigation from "../components/UserNavigation/UserNavigation";

function User({ children }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "USE-EFFECT-USER" });
  }, []);

  return (
    <>
      <UserNavigation />
      {children}
    </>
  );
}

export default User;
