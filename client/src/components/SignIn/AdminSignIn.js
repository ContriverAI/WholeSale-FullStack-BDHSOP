import React from "react";
import { motion } from "framer-motion";
import Styles from "./AdminSignIn.module.scss";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { adminSignIn } from "../../api/admin/Admin.api";
import { useHistory } from "react-router-dom";

function AdminSignIn({ onSwitch }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -120, opacity: 0 },
  };

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [togglePwd, setTogglePwd] = React.useState(true);

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SignIn = async () => {
    try {
      const resp = await adminSignIn(data);
      console.log(resp);
      !resp.data.success &&
        addToast(resp.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      if (resp.data.success) {
        dispatch({ type: "ADMIN-LOGGED-IN", payload: resp.data.token });
        localStorage.setItem("BDshopAdmin", resp.data.token);
        history.push("/admin-dashboard");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1 }}
        className={Styles.AdminSignIn_Container}
      >
        <p>
          Doesn't have an account ? <span onClick={onSwitch}>Sign up</span>
        </p>
        <label>
          Email address
          <div className={Styles.Input}>
            <span>
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
            <input
              placeholder="Your email"
              value={data.email}
              name="email"
              onChange={onInputChange}
            />
          </div>
        </label>
        <label>
          Password
          <span onClick={() => setTogglePwd(!togglePwd)}>
            {togglePwd ? (
              <i class="fa fa-eye-slash" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-eye" aria-hidden="true"></i>
            )}
          </span>
          <div className={Styles.Input}>
            <span>
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
            <input
              placeholder="Your password"
              value={data.password}
              name="password"
              onChange={onInputChange}
              type={togglePwd ? "password" : "text"}
            />
          </div>
        </label>
        <button onClick={SignIn}>Sign In</button>
      </motion.div>
    </>
  );
}

export default AdminSignIn;
