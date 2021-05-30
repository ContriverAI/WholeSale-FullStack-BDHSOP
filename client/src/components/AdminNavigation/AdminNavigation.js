import React from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminNavigation.scss";

function AdminNavigation() {
  const [toggle, setTggle] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutFunction = () => {
    dispatch({ type: "ADMIN-LOGGED-OUT" });
    localStorage.removeItem("BDshopAdmin");
    history.push("/admin");
  };
  //   const cart = useSelector((state) => state.User.cart);

  return (
    <>
      <nav className="Admin_Nav">
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
        <div className={`${toggle ? "Links-ADMIN" : "LinkActive-ADMIN"}`}>
          <Link
            activeClassName="active"
            className={"a"}
            to="/admin-dashboard"
            exact
          >
            Home
          </Link>
          {/* <Link activeClassName="active" className={"a"} to="/home" exact>
            Contact us
          </Link>
          <Link activeClassName="active" className={"a"} to="/home" exact>
            Cart
          </Link> */}
          <button onClick={logOutFunction}>LOG OUT</button>
        </div>
      </nav>
    </>
  );
}

export default AdminNavigation;
