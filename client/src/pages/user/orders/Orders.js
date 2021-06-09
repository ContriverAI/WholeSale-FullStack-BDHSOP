import React from "react";
import { useToasts } from "react-toast-notifications";
import {
  getAllOrders,
  updatePaymentScreenshot,
} from "../../../api/user/User.api";
import User from "../../User";
import Styles from "./Orders.module.scss";

function Items({ products }) {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className={Styles.Items}>
      <button onClick={() => setToggle(!toggle)}>
        View Items{" "}
        {toggle ? (
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-chevron-up" aria-hidden="true"></i>
        )}
      </button>
      {toggle && (
        <div className={Styles.ImgCtr}>
          {products.map((prod, i) => (
            <div className={Styles.Desc}>
              <img src={prod.image} alt={prod._id} />

              <div className={Styles.Details}>
                <div className={Styles.Row}>
                  <h4>
                    Name : <span>{prod.title}</span>
                  </h4>
                  <p>
                    Price : <span>{prod.amount}</span>
                  </p>
                  <p>
                    Quantity : <span>{prod.quantity}</span>
                  </p>
                  {prod?.deliveryDate && (
                    <p>
                      Delivery Date :{" "}
                      <span>
                        {new Date(prod?.deliveryDate).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Order({ item, products, getOrders, i }) {
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = React.useState("");
  const { addToast } = useToasts();

  const updatePayment = async (id) => {
    try {
      if (!data.trim()) {
        addToast("Payment screenshot is required.", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      const resp = await updatePaymentScreenshot(data, id);
      console.log(resp);
      addToast(resp.data.message, {
        appearance: "success",
        autoDismiss: true,
      });
      getOrders();
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setData(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      file && fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={Styles.Order}>
      <div className={Styles.Left}>
        <h1>
          Order amount : <span>{item?.total}</span>
        </h1>
        <p>
          Order Date : <span>{new Date(item?.date).toLocaleDateString()}</span>
        </p>
        <p>
          Order Status : <span>{item?.status}</span>
        </p>
        <p>
          Address: <span>{item?.address}</span>
        </p>
        <p>
          Payment Status: <span>{item?.paymentStatus}</span>
        </p>
        {!item?.paymentImage ? (
          <>
            <div className={Styles.Payment}>
              <label>
                Upload Payment Screenshot
                <input
                  accept=".jpg,.png,.jpeg"
                  onChange={uploadImage}
                  type="file"
                />
              </label>
              <button onClick={() => updatePayment(item._id)}>
                Update Payment
              </button>
            </div>
            {data && <img width="100%" src={data} alt="" />}
          </>
        ) : (
          <>
            <button onClick={() => setToggle(!toggle)}>
              View Payment Info{" "}
              {toggle ? (
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-chevron-up" aria-hidden="true"></i>
              )}
            </button>
            {toggle && (
              <img style={{ width: "100%" }} src={item?.paymentImage} alt="" />
            )}
          </>
        )}
      </div>
      <div className={Styles.Right}>
        {products.length > 0 && <Items products={products[i]} />}
        {/* <div className={Styles.ImgCtr}>
                  {products.length > 0 &&
                    products[i].map((prod, i) => (
                      <img src={prod.image} alt={prod._id} />
                    ))}
                </div> */}
      </div>
    </div>
  );
}

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log(response.data.user.orders);
      console.log(response.data.result);

      setOrders(response.data.user.orders);
      setProducts(response.data.result);
    } catch (e) {
      // console.log(e);
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);
  return (
    <User>
      <div className={Styles.Order_Container}>
        {orders.length > 0 &&
          orders.map((item, i) => (
            <Order
              item={item}
              products={products}
              getOrders={getOrders}
              i={i}
              key={i}
            />
          ))}
      </div>
    </User>
  );
}

export default Orders;
