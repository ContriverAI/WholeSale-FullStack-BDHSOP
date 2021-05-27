import React from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const cart = useSelector((state) => state.User.cart);

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
          <Link activeClassName="active" className={"a"} to="/products" exact>
            Your products
          </Link>
          <Link activeClassName="active" className={"a"} to="/home" exact>
            Contact us
          </Link>
          <Link activeClassName="active" className={"a"} to="/home" exact>
            Cart {cart.length > 0 && <span>{cart.length}</span>}
          </Link>
          <button onClick={logOutFunction}>LOG OUT</button>
        </div>
      </nav>
    </>
  );
}

export default UserNavigation;
