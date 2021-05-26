import React, { useState } from "react";
import Styles from "./Home.module.scss";
import Banner from "../../../assets/images/shopping.svg";
import UserSignUp from "../../../components/SignIn/UserSignUp";
import UserSignIn from "../../../components/SignIn/UserSignIn";

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
      <div className={Styles.Left_Block}>
        <img src={Banner} alt="Banner" />
        <h1>Quick order by any link</h1>
        <SideDots />
      </div>
      <div className={Styles.Right_Block}>
        {signUp ? (
          <UserSignUp onSwitch={() => setSignUp(!signUp)} />
        ) : (
          <UserSignIn onSwitch={() => setSignUp(!signUp)} />
        )}
      </div>
    </div>
  );
}

export default Home;
