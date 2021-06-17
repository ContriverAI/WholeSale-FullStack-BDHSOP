import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  createNewOrder,
  updateQuantityBeforeOrder,
} from "../../../api/user/User.api";
import User from "../../User";
import Styles from "./Cart.module.scss";
import { useHistory } from "react-router-dom";
import { FormatListNumberedRtlOutlined } from "@material-ui/icons";

function Cart() {
  const history = useHistory();
  const carts = useSelector((state) => state.User.cart);
  const addresses = useSelector((state) => state.User.profile.address);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [qty, setQty] = React.useState({});

  const updateQty = async (id) => {
    if (!qty[id] || qty[id] == 0) {
      addToast("Enter valid quantity", {
        appearance: "error",
        autoDismiss: true,
      });
      return null;
    }
    try {
      const resp = await updateQuantityBeforeOrder(id, qty[id]);
      if (resp.data.success) {
        addToast("Quantity updated.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (e) {}
    dispatch({
      type: "UPDATE-QTY",
      payload: {
        id,
        qty: qty[id],
      },
    });
    setQty({});
  };

  const newOrder = async () => {
    try {
      const data = {
        products: carts.map((item) => item._id),
        amount: carts.reduce(
          (prevValue, currentValue) =>
            prevValue +
            Number(currentValue.amount) * Number(currentValue.quantity),
          0
        ),
        deliveryAmount: carts.reduce(
          (prevValue, currentValue) =>
            prevValue + (currentValue?.deliveryCharges || 0),
          0
        ),
        address: addresses[0],
        total:
          carts.reduce(
            (prevValue, currentValue) =>
              prevValue +
              Number(currentValue.amount) * Number(currentValue.quantity),
            0
          ) +
          carts.reduce(
            (prevValue, currentValue) =>
              prevValue + (currentValue?.deliveryCharges || 0),
            0
          ),
      };
      const qnty = carts.reduce(
        (prevValue, currentValue) => prevValue + Number(currentValue.quantity),
        0
      );
      if (qnty < 5) {
        addToast("Quantity can not be less than 5", {
          appearance: "error",
          autoDismiss: true,
        });
        return null;
      }

      const response = await createNewOrder(data);
      console.log(response);
      if (response.data.success) {
        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch({ type: "EMPTY-CART" });
        history.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <User>
      {carts.length > 0 ? (
        <>
          <div className={Styles.Cart_Container}>
            <div className={Styles.Left}>
              {carts.map((item, i) => (
                <div key={item._id} className={Styles.ItemRow}>
                  <div className={Styles.Img}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={Styles.Desc}>
                    <h1>{item.title}</h1>
                    <p>
                      Price : <span>{item.amount}</span>
                    </p>
                    <p>
                      Quantity : <span>{item.quantity}</span>
                    </p>
                    <div>
                      <input
                        name={item?._id}
                        onChange={(e) =>
                          setQty({ ...qty, [e.target.name]: e.target.value })
                        }
                        value={qty?._id}
                        type="Number"
                      />
                      <button onClick={() => updateQty(item._id)}>
                        UPDATE QUANTITY
                      </button>
                    </div>
                    <p>
                      Delivery Charges : <span>{item.deliveryCharges}</span>
                    </p>
                    <p>
                      Shipping Days : <span>{item.shippingDays}</span>
                    </p>
                    <p>
                      Expected Delivery Date :{" "}
                      <span>
                        {new Date(item.deliveryDate).toLocaleDateString()}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "REMOVE-FROM-CART",
                          payload: item._id,
                        });
                        addToast("Removed from cart", {
                          appearance: "error",
                          autoDismiss: true,
                        });
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={Styles.Right}>
              <div className={Styles.Price}>
                <div className={Styles.Row}>
                  <h5>Total Price</h5>
                  <p>
                    {carts.reduce(
                      (prevValue, currentValue) =>
                        prevValue +
                          currentValue.amount * currentValue.quantity || 1,
                      0
                    )}
                  </p>
                </div>
                <div className={Styles.Row}>
                  <h5>Total Delivery Charges</h5>
                  <p>
                    {carts.reduce(
                      (prevValue, currentValue) =>
                        prevValue + (currentValue?.deliveryCharges || 0),
                      0
                    )}
                  </p>
                </div>
                <div className={Styles.Bar}></div>
                <div className={Styles.Row}>
                  <h4>Total Amount</h4>
                  <p className={Styles.Total}>
                    {carts.reduce(
                      (prevValue, currentValue) =>
                        prevValue +
                          currentValue.amount * currentValue.quantity || 1,
                      0
                    ) +
                      carts.reduce(
                        (prevValue, currentValue) =>
                          prevValue + (currentValue?.deliveryCharges || 0),
                        0
                      )}
                  </p>
                </div>
                <button onClick={newOrder}>PLACE ORDER</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={Styles.NoItem}>
          <h3>No items in cart.</h3>
        </div>
      )}
    </User>
  );
}

export default Cart;
