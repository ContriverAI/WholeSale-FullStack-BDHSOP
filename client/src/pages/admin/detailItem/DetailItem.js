import React from "react";
import { useToasts } from "react-toast-notifications";
import { getItemById, updateItemStatus } from "../../../api/admin/Admin.api";
import Admin from "../../Admin";
import Styles from "./DetailItem.module.scss";

function DetailItem(props) {
  const { addToast } = useToasts();
  const [data, setData] = React.useState();
  const [inputData, setInputData] = React.useState({
    status: "",
    amount: "",
    deliveryCharges: "",
    shippingDays: "",
    deliveryDate: "",
  });

  const onInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const getItem = async (id) => {
    try {
      const resp = await getItemById(id);
      console.log(resp.data.item);
      setData(resp.data.item);
    } catch (err) {}
  };

  React.useEffect(() => {
    getItem(props.match.params.itemId);
  }, []);

  const updateProduct = async (id) => {
    try {
      const resp = await updateItemStatus(inputData, id);
      !resp.data.success &&
        addToast(resp.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      console.log(resp);
      resp.data.success &&
        addToast("Product status updated", {
          appearance: "success",
          autoDismiss: true,
        });
      setInputData({
        status: "",
        amount: "",
        deliveryCharges: "",
        shippingDays: "",
        deliveryDate: "",
      });
      // getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Admin>
      {data && (
        <div className={Styles.Detail_Container}>
          <div className={Styles.Left}>
            <img src={data?.image} alt={data?.title} />
          </div>
          <div className={Styles.Right}>
            <h1 className={Styles.Key}>
              Title : <span>{data?.title}</span>
            </h1>
            <p className={Styles.Key}>
              Status : <span>{data.status}</span>
            </p>
            <a
              className={Styles.Key}
              href={data.link}
              style={{ textDecoration: "none" }}
            >
              Link : <span>{data.link.slice(0, 60)}...</span>
            </a>
            <p className={Styles.Key}>
              Quantity : <span>{data.quantity}</span>
            </p>
            <p className={Styles.Key}>
              Requested Date & Time :{" "}
              <span>
                {new Date(data.date).toLocaleDateString()} &{" "}
                {new Date(data.date).toLocaleTimeString()}
              </span>
            </p>
            <div className={Styles.Requestor}>
              <h2>Requester Details</h2>
              <div className={Styles.Details}>
                <p className={Styles.Key}>
                  Name : <span>{data.clientID.userName}</span>
                </p>
                <p className={Styles.Key}>
                  Email : <span>{data.clientID.email}</span>
                </p>
                <p className={Styles.Key}>
                  Mobile : <span>{data.clientID.mobile}</span>
                </p>
                <p className={Styles.Key}>
                  Address : <span>{data.clientID.address[0]}</span>
                </p>
              </div>
            </div>
            {data.status === "pending" && (
              <>
                <div className={Styles.Form}>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    name="amount"
                    value={inputData.amount}
                    onChange={onInputChange}
                  />
                  <select
                    value={inputData.status}
                    name="status"
                    onChange={onInputChange}
                  >
                    <option value="" defaultValue hidden>
                      Manage Request
                    </option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Delivery Charges"
                    value={inputData.deliveryCharges}
                    name="deliveryCharges"
                    onChange={onInputChange}
                  />
                  <input
                    type="number"
                    placeholder="Shipping Days"
                    value={inputData.shippingDays}
                    name="shippingDays"
                    onChange={onInputChange}
                  />
                  <input
                    type="text"
                    onFocus={(e) => (e.currentTarget.type = "date")}
                    onBlur={(e) => (e.currentTarget.type = "text")}
                    placeholder="Expected Delivery Date"
                    value={inputData.deliveryDate}
                    name="deliveryDate"
                    onChange={onInputChange}
                  />
                </div>
                <div className={Styles.Submit}>
                  <button
                    onClick={() => updateProduct(props.match.params.itemId)}
                  >
                    UPDATE
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Admin>
  );
}

export default DetailItem;
