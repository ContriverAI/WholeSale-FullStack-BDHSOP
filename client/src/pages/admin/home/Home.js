import React, { useState } from "react";
import Styles from "./Home.module.scss";
import Banner from "../../../assets/images/admin.svg";
import AdminSignIn from "../../../components/SignIn/AdminSignIn";
import AdminSignUp from "../../../components/SignIn/AdminSignUp";

function SideDots() {
  return (
    <div className={Styles.Dots_Container}>
      {Array.from({ length: 25 }, (_, i) => (
        <div className={Styles.Dots}></div>
      ))}
    </div>
  );
}

function Home() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className={Styles.Home_Container}>
      <div className={Styles.Right_Block}>
        {signUp ? (
          <AdminSignUp onSwitch={() => setSignUp(!signUp)} />
        ) : (
          <AdminSignIn onSwitch={() => setSignUp(!signUp)} />
        )}
      </div>
      <div className={Styles.Left_Block}>
        <img src={Banner} alt="Banner" />
        <h1>Admin access only.</h1>
        <SideDots />
      </div>
    </div>
  );
}

export default Home;
