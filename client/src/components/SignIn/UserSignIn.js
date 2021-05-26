import React from "react";
import { motion } from "framer-motion";
import Styles from "./UserSignIn.module.scss";
import { userSignIn } from "../../api/user/User.api";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

function UserSignIn({ onSwitch }) {
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

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SignIn = async () => {
    try {
      const resp = await userSignIn(data);
      console.log(resp);
      !resp.data.success &&
        addToast(resp.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      if (resp.data.success) {
        dispatch({ type: "LOGGED-IN", payload: resp.data.token });
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
        className={Styles.UserSignIn_Container}
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
          <div className={Styles.Input}>
            <span>
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
            <input
              placeholder="Your password"
              value={data.password}
              name="password"
              onChange={onInputChange}
            />
          </div>
        </label>
        <button onClick={SignIn}>Sign In</button>
      </motion.div>
    </>
  );
}

export default UserSignIn;
