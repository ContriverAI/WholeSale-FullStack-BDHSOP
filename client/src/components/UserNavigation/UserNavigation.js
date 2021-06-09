import React from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UserNavigation.scss";

function UserNavigation() {
  const [toggle, setTggle] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.User.profile);

  const logOutFunction = () => {
    dispatch({ type: "LOGGED-OUT" });
    localStorage.removeItem("BDshopUser");
    localStorage.removeItem("BDshopUserProfile");
    history.push("/");
  };
  const cart = useSelector((state) => state.User.cart);

  return (
    <>
      <nav>
        <div className={"Logo"}>
          <div className="LogoCTR">
            <h1>BD Shop</h1>
            <p>Welcome, {user.userName}</p>
          </div>
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
          <Link activeClassName="active" className={"a"} to="/home" exact>
            Home
          </Link>
          <Link activeClassName="active" className={"a"} to="/products" exact>
            Your products
          </Link>
          <Link activeClassName="active" className={"a"} to="/orders" exact>
            My Orders
          </Link>
          {/* <Link activeClassName="active" className={"a"} to="" exact>
            Contact us
          </Link> */}
          <Link activeClassName="active" className={"a"} to="/cart" exact>
            Cart {cart.length > 0 && <span>{cart.length}</span>}
          </Link>
          <button onClick={logOutFunction}>LOG OUT</button>
        </div>
      </nav>
    </>
  );
}

export default UserNavigation;
