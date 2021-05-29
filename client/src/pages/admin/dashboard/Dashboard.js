import React from "react";
import {
  getPendingItems,
  updateItemStatus,
} from "../../../api/admin/Admin.api";
import Admin from "../../Admin";
import Styles from "./Dashboard.module.scss";
import moment from "moment";

function Dashboard() {
  const [data, setData] = React.useState([]);
  const [inputData, setInputData] = React.useState({
    status: "",
    amount: "",
  });

  const getProducts = async () => {
    try {
      const resp = await getPendingItems();
      console.log(resp);
      resp.data.success && setData(resp.data.data);
    } catch (err) {}
  };

  const updateProduct = async (id) => {
    try {
      const resp = await updateItemStatus(inputData, id);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <Admin>
      <div className={Styles.DashBoard}>
        <h1>Manage Request (Accept/Decline)</h1>
        <p>Admins can manually accept or decline request.</p>
        <div className={Styles.TabDetails}>
          {data.map((item, _) => (
            <div className={Styles.ItemRow} key={item._id}>
              <div className={Styles.Left}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={Styles.Right}>
                <div className={Styles.Desc}>
                  <h4>Link</h4>
                  <a href={item.link}>{item.link.slice(0, 50)}...</a>
                </div>
                <div className={Styles.Desc}>
                  <h4>Title</h4>
                  <p>{item.title}</p>
                </div>
                {item?.amount && (
                  <>
                    <div className={Styles.Desc}>
                      <h4>Amount</h4>
                      <p>{item.amount}</p>
                    </div>
                  </>
                )}
                <div className={Styles.Desc}>
                  <h4>Shop</h4>
                  <p>{item.shop}</p>
                </div>
                <div className={Styles.Desc}>
                  <h4>Quantity</h4>
                  <p>{item.quantity}</p>
                </div>
                <div className={Styles.Desc}>
                  <h4>Category</h4>
                  <p>{item.category}</p>
                </div>
                <div className={Styles.Desc}>
                  <h4>Requested date & Time</h4>
                  <p>
                    {new Date(item.date).toISOString().slice(0, 10)} &{" "}
                    {moment(item.date).format("hh:mm a")}
                  </p>
                </div>
                <div className={Styles.Desc}>
                  {item.labels.length > 0 &&
                    item.labels.map((tag, _) => (
                      <p key={tag._id} className={Styles.Tags}>
                        <span className={Styles.Label}>{tag.label}</span>
                        <span className={Styles.Value}>{tag.value}</span>
                      </p>
                    ))}
                </div>
                <div className={Styles.Desc}>
                  <h4>Instruction</h4>
                  <p>{item.instruction}</p>
                </div>
                <div className={Styles.Desc}>
                  <input
                    onChange={(e) =>
                      setInputData({ ...inputData, amount: e.target.value })
                    }
                    type="number"
                    placeholder="Enter Amount"
                  />
                  <select
                    onChange={(e) =>
                      setInputData({ ...inputData, status: e.target.value })
                    }
                  >
                    <option value="" defaultValue hidden>
                      Manage Request
                    </option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                </div>
                <div className={Styles.Desc}>
                  <button onClick={() => updateProduct(item._id)}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}

export default Dashboard;
