import React from "react";
import {
  deleteProductById,
  getUsersProducts,
} from "../../../api/user/User.api";
import moment from "moment";
import User from "../../User";
import Styles from "./UserProducts.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

function TabComponent({ data, getProducts }) {
  const now = moment();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const cart = useSelector((state) => state.User.cart);

  const variants = {
    visible: { x: 0, opacity: 1 },
    hidden: { x: -120, opacity: 0 },
  };

  const deleteProduct = async (id) => {
    try {
      const resp = await deleteProductById(id);
      console.log(resp);
      resp.data.success &&
        addToast("Item deleted.", {
          appearance: "error",
          autoDismiss: true,
        });
      getProducts();
    } catch (err) {}
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1 }}
      className={Styles.TabContainer}
    >
      {data.map((item, _) => (
        <div className={Styles.ItemRow} key={item._id}>
          <div className={Styles.Left}>
            <img src={item.image} alt={item.title} />
          </div>
          <div className={Styles.Right}>
            <div className={Styles.Desc}>
              <h4>Title</h4>
              <p>{item.title}</p>
            </div>
            {item.status === "approved" && (
              <>
                <div className={Styles.Desc}>
                  <h4>Amount</h4>
                  <p>{item.amount}</p>
                </div>
              </>
            )}
            {/* <div className={Styles.Desc}>
              <h4>Shop</h4>
              <p>{item.shop}</p>
            </div> */}
            <div className={Styles.Desc}>
              <h4>Quantity</h4>
              <p>{item.quantity}</p>
            </div>
            {/* <div className={Styles.Desc}>
              <h4>Category</h4>
              <p>{item.category}</p>
            </div> */}
            <div className={Styles.Desc}>
              <h4>Requested date & Time</h4>
              <p>
                {new Date(item.date).toISOString().slice(0, 10)} &{" "}
                {moment(item.date).format("hh:mm a")}
              </p>
            </div>
            {/* <div className={Styles.Desc}>
              {item.labels.length > 0 &&
                item.labels.map((tag, _) => (
                  <p key={tag._id} className={Styles.Tags}>
                    <span className={Styles.Label}>{tag.label}</span>
                    <span className={Styles.Value}>{tag.value}</span>
                  </p>
                ))}
            </div> */}
            <div className={Styles.Desc}>
              <h4>Instruction</h4>
              <p>{item.instruction}</p>
            </div>
            {item?.deliveryCharges && (
              <div className={Styles.Desc}>
                <h4>Delivery Charges</h4>
                <p>{item?.deliveryCharges}</p>
              </div>
            )}
            {item?.shippingDays && (
              <div className={Styles.Desc}>
                <h4>Shipping Days</h4>
                <p>{item?.shippingDays}</p>
              </div>
            )}
            {item?.deliveryDate && (
              <div className={Styles.Desc}>
                <h4>Delivery Date</h4>
                <p>{new Date(item?.deliveryDate).toLocaleDateString()}</p>
              </div>
            )}
            {item?.amount !== 0 && (
              <div className={Styles.Desc}>
                <h4>Amount (Per Piece)</h4>
                <p>{item.amount}</p>
              </div>
            )}
            {item.status === "approved" &&
              (cart
                .map((cartItem) => cartItem._id.toString())
                .includes(item._id.toString()) ? (
                <button
                  onClick={() => {
                    dispatch({ type: "REMOVE-FROM-CART", payload: item._id });
                    addToast("Removed from cart", {
                      appearance: "error",
                      autoDismiss: true,
                    });
                  }}
                  className={Styles.Remove}
                >
                  REMOVE FROM CART
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch({ type: "ADD-TO-CART", payload: item });
                    addToast("Added to cart.", {
                      appearance: "success",
                      autoDismiss: true,
                    });
                  }}
                  className={Styles.Add}
                >
                  ADD TO CART
                </button>
              ))}
            {item.status === "pending" && (
              <button
                onClick={() => deleteProduct(item._id)}
                className={Styles.Remove}
              >
                DELETE REQUEST
              </button>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function UserProducts() {
  const [tabDataSelector, setTabDataSelector] = React.useState("pending");
  const [data, setData] = React.useState([]);

  const getProducts = async () => {
    try {
      const resp = await getUsersProducts();
      console.log(resp.data.data.products);
      resp.data.success && setData(resp.data.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const Tabs = React.useRef(null);
  const Line = React.useRef(null);
  const TabAnimation = () => {
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

  const TabData = {
    pending: (
      <TabComponent
        data={data.filter((item) => item.status === "pending")}
        getProducts={getProducts}
      />
    ),
    approved: (
      <TabComponent
        data={data.filter((item) => item.status === "approved")}
        getProducts={getProducts}
      />
    ),
    rejected: (
      <TabComponent
        data={data.filter((item) => item.status === "rejected")}
        getProducts={getProducts}
      />
    ),
    expired: (
      <TabComponent
        data={data.filter((item) => item.status === "expired")}
        getProducts={getProducts}
      />
    ),
  };

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
              onClick={() => {
                moveLine(0, "#0090ff");
                setTabDataSelector("pending");
              }}
            >
              Pending
              <span>
                {data.filter((item) => item.status === "pending").length}
              </span>
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => {
                moveLine(0.3333, "#00d848");
                setTabDataSelector("approved");
              }}
            >
              Approved
              <span>
                {data.filter((item) => item.status === "approved").length}
              </span>
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => {
                moveLine(0.6666, "#ff5151");
                setTabDataSelector("rejected");
              }}
            >
              Rejected
              <span>
                {data.filter((item) => item.status === "rejected").length}
              </span>
            </div>
            <div
              className={Styles.Button}
              ref={Tabs}
              onClick={() => {
                moveLine(1, "#d3be00");
                setTabDataSelector("expired");
              }}
            >
              Expired
              <span>
                {data.filter((item) => item.status === "expired").length}
              </span>
            </div>
            <div className={Styles.Line} ref={Line}></div>
          </div>
          <div className={Styles.TabDetails}>
            {data.length > 0 ? TabData[tabDataSelector] : "Loading"}
          </div>
        </div>
      </div>
    </User>
  );
}

export default UserProducts;
