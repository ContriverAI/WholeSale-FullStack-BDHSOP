import React from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getOrderById, UpdateOrder } from "../../../api/admin/Admin.api";
import Admin from "../../Admin";
import Styles from "./OrderDetail.module.scss";

function OrderDetail(props) {
  const history = useHistory();

  const { addToast } = useToasts();
  const [data, setData] = React.useState();
  const [inputDetails, setInputDetails] = React.useState({
    paymentStatus: "",
    status: "",
    notes: "",
  });

  const fetchData = async () => {
    try {
      const resp = await getOrderById(props.match.params.itemId);
      console.log(resp.data.orders);
      if (resp.data.success) {
        setData(resp.data.orders);
        setInputDetails({
          ...inputDetails,
          status: resp.data.orders.status,
          paymentStatus: resp.data.orders.paymentStatus,
          notes: resp?.data?.orders?.notes,
        });
      }
    } catch (err) {}
  };

  const submitProductHandler = async () => {
    // if (!inputDetails.paymentStatus || inputDetails.status) {
    // addToast("Status & Payment Status can't be missing", {
    //   appearance: "error",
    //   autoDismiss: true,
    // });
    // }
    try {
      const resp = await UpdateOrder(inputDetails, props.match.params.itemId);
      console.log(resp);
      if (resp.data.success) {
        addToast("Product Updated.", {
          appearance: "success",
          autoDismiss: true,
        });
        history.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Admin>
      <div className={Styles.OrderDetail_Container}>
        <div className={Styles.Left}>
          {data &&
            data.products.map((item, i) => (
              <div className={Styles.Product}>
                <img src={item.image} alt={item.title} />
                <div className={Styles.Desc}>
                  <h1>
                    Name : <span>{item.title}</span>
                  </h1>
                  <p>
                    Price : <span>{item.amount}</span>
                  </p>
                  <p>
                    Quantity : <span>{item.quantity}</span>
                  </p>
                  <p>
                    Delivery Date :{" "}
                    <span>
                      {new Date(item?.deliveryDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className={Styles.Right}>
          <div className={Styles.OrdersDetails}>
            <h1>
              Order Id : <span>{data?.orderID}</span>
            </h1>
            <h1>
              Order Date :{" "}
              <span>{new Date(data?.date).toLocaleDateString()}</span>
            </h1>
            <h3>
              Order Time :{" "}
              <span>{new Date(data?.date).toLocaleTimeString()}</span>
            </h3>
            <p>
              Order Status : <span>{data?.status}</span>
            </p>
          </div>
          <div className={Styles.Amounts}>
            <table>
              <tr>
                <td>Amount</td>
                <td>{data?.amount}</td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>{data?.deliveryAmount}</td>
              </tr>
              <tr className={Styles.Total}>
                <td>Total</td>
                <td>{data?.total}</td>
              </tr>
            </table>
          </div>
          <div className={Styles.Delivery}>
            <h2>Delivery Details</h2>
            <h4>
              Username : <span>{data?.user?.userName}</span>
            </h4>
            <p>
              Email : <span>{data?.user?.email}</span>
            </p>
            <p>
              Phone : <span>{data?.user?.mobile}</span>
            </p>

            <p>
              Address : <span>{data?.address}</span>
            </p>
            <h2>
              Payment status : <span>{data?.paymentStatus}</span>
            </h2>
            {data?.notes && (
              <h2>
                Note : <span>{data?.notes}</span>
              </h2>
            )}
          </div>
          {data?.paymentImage && (
            <img className={Styles.Payment} src={data?.paymentImage} alt="" />
          )}
          <div className={Styles.Input}>
            <select
              value={inputDetails.status}
              name="status"
              onChange={(e) =>
                setInputDetails({ ...inputDetails, status: e.target.value })
              }
            >
              <option value="" defaultValue hidden>
                Order Status
              </option>
              {/* {data && (
                <option value={inputDetails?.status}>
                  {inputDetails?.status}
                </option>
              )} */}
              <option value="created">Created</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Reject</option>
            </select>

            <select
              value={inputDetails.paymentStatus}
              name="paymentStatus"
              onChange={(e) =>
                setInputDetails({
                  ...inputDetails,
                  paymentStatus: e.target.value,
                })
              }
            >
              <option value="" defaultValue hidden>
                Payment Status
              </option>
              {/* {data && (
                <option value={inputDetails?.paymentStatus}>
                  {inputDetails?.paymentStatus}
                </option>
              )} */}
              <option value="payment submitted">Payment Submitted</option>

              <option value="under verification">Under Verification</option>
              <option value="payment verified">Payment Verified</option>
              <option value="payment rejected">Payment Rejected</option>
            </select>
            <input
              onChange={(e) =>
                setInputDetails({
                  ...inputDetails,
                  notes: e.target.value,
                })
              }
              value={inputDetails.notes}
              placeholder="Notes"
            />
            <button onClick={submitProductHandler}>Update</button>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default OrderDetail;
