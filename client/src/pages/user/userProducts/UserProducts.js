import React from "react";
import { getUsersProducts } from "../../../api/user/User.api";
import User from "../../User";
import Styles from "./UserProducts.module.scss";

function UserProducts() {
  const getProducts = async () => {
    try {
      const resp = await getUsersProducts();
      console.log(resp);
    } catch (err) {}
  };

  const Tabs = React.useRef(null);
  const Line = React.useRef(null);
  const TabAnimation = () => {
    // const tabs = document.getElementsByClassName("Button");
    console.log(Tabs);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = Tabs;
    // const panes = $$(".tab-pane");

    const tabActive = Tabs.current;
    const line = Line.current;

    line.style.left = tabActive.offsetLeft * 0 + "px";
    line.style.width = tabActive.offsetWidth + "px";
    line.style.backgroundColor = "#0090ff";
  };

  const moveLine = (i, color) => {
    const tabActive = Tabs.current;
    const line = Line.current;
    line.style.left = tabActive.offsetLeft * i + "px";
    line.style.backgroundColor = color;
  };

  React.useEffect(() => {
    getProducts();
    TabAnimation();
  }, []);

  return (
    <User>
      <div className={Styles.UserProducts}>
        <h1>Manage Request</h1>
        <p>You can manage your manually requested products here.</p>
        <div className={Styles.TabContainer}>
          <div className={Styles.TabHead}>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => moveLine(0, "#0090ff")}
            >
              Pending
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => moveLine(0.3333, "#00d848")}
            >
              Approved
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => moveLine(0.6666, "#ff5151")}
            >
              Rejected
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => moveLine(1, "#d3be00")}
            >
              Expired
            </div>
            <div className={Styles.Line} ref={Line}></div>
          </div>
        </div>
      </div>
    </User>
  );
}

export default UserProducts;
