import React from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./UserNavigation.scss";

function UserNavigation() {
  const [toggle, setTggle] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutFunction = () => {
    dispatch({ type: "LOGGED=OUT" });
    localStorage.removeItem("BDshop");
    history.push("/");
  };
  return (
    <>
      <nav>
        <div className={"Logo"}>
          <h1>BD Shop</h1>
          <div
            id="toggle"
            className={`${toggle ? "Active" : "HamBurger"}`}
            onClick={() => setTggle(!toggle)}
          >
            <div className={"Bar"}></div>
            <div className={"Bar"}></div>
            <div className={"Bar"}></div>
          </div>
        </div>
        <div className={`${toggle ? "Links" : "LinkActive"}`}>
          <Link className={"a"} to="/">
            Your products
          </Link>
          <Link className={"a"} to="/">
            Contact us
          </Link>
          <Link className={"a"} to="/">
            Cart
          </Link>
          <button onClick={logOutFunction}>LOG OUT</button>
        </div>
      </nav>
    </>
  );
}

export default UserNavigation;
