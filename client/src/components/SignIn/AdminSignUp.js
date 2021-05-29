import React from "react";
import { motion } from "framer-motion";
import Styles from "./AdminSignIn.module.scss";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { adminSignUp } from "../../api/admin/Admin.api";
import { useHistory } from "react-router-dom";

function Stepper({ step, nextStep, prevStep, onInputChange, data, SignUp }) {
  switch (step) {
    case 1:
      return (
        <>
          <label>
            Email address
            <div className={Styles.Input}>
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input
                placeholder="Enter your email"
                value={data.email}
                name="email"
                onChange={onInputChange}
              />
            </div>
          </label>
          <label>
            Mobile Number
            <div className={Styles.Input}>
              <span>
                <i class="fa fa-mobile" aria-hidden="true"></i>
              </span>
              <input
                placeholder="Enter your mobile number"
                value={data.mobile}
                name="mobile"
                onChange={onInputChange}
              />
            </div>
          </label>
          <label>
            Username
            <div className={Styles.Input}>
              <span>
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
              <input
                placeholder="Enter your username"
                value={data.userName}
                name="userName"
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
                placeholder="Enter your password"
                value={data.password}
                name="password"
                onChange={onInputChange}
              />
            </div>
          </label>
          <button style={{ width: "20%" }} onClick={nextStep}>
            NEXT
          </button>
        </>
      );
    case 2:
      return (
        <>
          <label>
            Country
            <div className={Styles.Input}>
              {/* <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span> */}
              <input
                placeholder="Country"
                value={data.country}
                name="country"
                onChange={onInputChange}
              />
            </div>
          </label>
          <label>
            State
            <div className={Styles.Input}>
              {/* <span>
                <i class="fa fa-mobile" aria-hidden="true"></i>
              </span> */}
              <input
                placeholder="State"
                value={data.state}
                name="state"
                onChange={onInputChange}
              />
            </div>
          </label>
          <label>
            PIN
            <div className={Styles.Input}>
              {/* <span>
                <i class="fa fa-user" aria-hidden="true"></i>
              </span> */}
              <input
                placeholder="Pincode"
                value={data.pin}
                name="pin"
                onChange={onInputChange}
              />
            </div>
          </label>

          <label>
            Address
            <div className={Styles.Input}>
              {/* <span>
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span> */}
              <textarea
                placeholder="Address"
                value={data.address}
                name="address"
                onChange={onInputChange}
              />
            </div>
          </label>
          <button style={{ width: "20%" }} onClick={prevStep}>
            PREV
          </button>
          <button onClick={SignUp}>Sign Up</button>
        </>
      );
    default:
      return null;
  }
}

function AdminSignUp({ onSwitch }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -120, opacity: 0 },
  };

  const [data, setData] = React.useState({
    email: "",
    userName: "",
    password: "",
    mobile: "",
    country: "",
    state: "",
    pin: "",
    address: "",
  });
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [step, setStep] = React.useState(1);
  const SignUp = async () => {
    try {
      const resp = await adminSignUp(data);
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
        <h2>Get started</h2>
        <p>
          Already have an account ? <span onClick={onSwitch}>Sign in</span>
        </p>
        <Stepper
          step={step}
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          onInputChange={onInputChange}
          data={data}
          SignUp={SignUp}
        />
      </motion.div>
    </>
  );
}

export default AdminSignUp;
