import React from "react";
import { useToasts } from "react-toast-notifications";
import { createNewProductRequest } from "../../../api/user/User.api";
import User from "../../User";
import Styles from "./Dashboard.module.scss";

function Dashboard() {
  const { addToast } = useToasts();

  const [data, setData] = React.useState({
    link: "",
    image: "",
    title: "",
    quantity: "",
    shop: "",
    category: "",
    instruction: "",
    labels: [],
  });

  const [Label, setLabel] = React.useState({
    label: "",
    value: "",
  });
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setData({ ...data, image: base64 });
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

  const createNewProduct = async () => {
    try {
      const response = await createNewProductRequest(data);
      response.data.success
        ? addToast(response.data.message, {
            appearance: "success",
            autoDismiss: true,
          })
        : addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
      response.data.success &&
        setData({
          link: "",
          image: "",
          title: "",
          quantity: "",
          shop: "",
          category: "",
          instruction: "",
          labels: [],
        });
    } catch (err) {
      addToast(err.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <User>
      <div className={Styles.Dashboard_Container}>
        <h1>BD Shop Manual Request</h1>
        <p>You can manage your manually requested products here.</p>
        <div className={Styles.Form}>
          <div className={Styles.Left}>
            {data.image ? (
              <>
                <img src={data.image} alt="item" />
                {data.image && (
                  <button onClick={() => setData({ ...data, image: "" })}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                )}
              </>
            ) : (
              <img src={"https://ali2bd.com/img/placeholder.jpg"} alt="item" />
            )}
          </div>
          <div className={Styles.Right}>
            <div className={Styles.RowFull}>
              <label>
                Product Link
                <input
                  type="text"
                  placeholder="Paste item's link"
                  value={data.link}
                  onChange={(e) => setData({ ...data, link: e.target.value })}
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Product Name
                <input
                  type="text"
                  placeholder="Product name"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Product Image
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  placeholder="Upload image"
                  onChange={uploadImage}
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={data.quantity}
                  onChange={(e) =>
                    setData({ ...data, quantity: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Shop
                <input
                  type="text"
                  placeholder="Shop"
                  value={data.shop}
                  onChange={(e) => setData({ ...data, shop: e.target.value })}
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Category
                <input
                  type="text"
                  placeholder="Category"
                  value={data.category}
                  onChange={(e) =>
                    setData({ ...data, category: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Instruction
                <input
                  type="text"
                  placeholder="Instruction"
                  value={data.instruction}
                  onChange={(e) =>
                    setData({ ...data, instruction: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Label
                <input
                  type="text"
                  placeholder="Label"
                  value={Label.label}
                  onChange={(e) =>
                    setLabel({ ...Label, label: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Value
                <input
                  type="text"
                  placeholder="Value"
                  value={Label.value}
                  onChange={(e) =>
                    setLabel({ ...Label, value: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.RowFull}>
              <button
                onClick={() => {
                  if (!Label.label || !Label.value) {
                    addToast("Label or value is missing", {
                      appearance: "error",
                      autoDismiss: true,
                    });
                    return;
                  }
                  setData({
                    ...data,
                    labels: [
                      ...data.labels,
                      { label: Label.label, value: Label.value },
                    ],
                  });
                  setLabel({ label: "", value: "" });
                }}
              >
                Add New Label
              </button>
            </div>
            {data.labels.length > 0 &&
              data.labels.map((item, i) => (
                <p label={i} className={Styles.Tags}>
                  {item.label}:{item.value}
                  <span
                    onClick={() =>
                      setData({
                        ...data,
                        labels: [
                          ...data.labels.filter(
                            (tag) => data.labels.indexOf(tag) !== i
                          ),
                        ],
                      })
                    }
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </span>
                </p>
              ))}
            <div className={Styles.RowFull}>
              <button style={{ width: "100%" }} onClick={createNewProduct}>
                Make Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </User>
  );
}

export default Dashboard;
