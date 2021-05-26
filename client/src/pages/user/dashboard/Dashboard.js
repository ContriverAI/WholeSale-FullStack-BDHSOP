import React from "react";
import { useToasts } from "react-toast-notifications";
import User from "../../User";
import Styles from "./Dashboard.module.scss";

function Dashboard() {
  const { addToast } = useToasts();

  const [data, setData] = React.useState({
    image: "",
    labels: [],
  });

  const [Label, setLabel] = React.useState({
    key: "",
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

  return (
    <User>
      <div className={Styles.Dashboard_Container}>
        <h1>BD Shop Manual Request</h1>
        <p>You can manage your manually requested products here.</p>
        <div className={Styles.Form}>
          <div className={Styles.Left}>
            {data.image ? (
              <img src={data.image} alt="item" />
            ) : (
              <img src={"https://ali2bd.com/img/placeholder.jpg"} alt="item" />
            )}
          </div>
          <div className={Styles.Right}>
            <div className={Styles.RowFull}>
              <label>
                Product Link
                <input type="text" placeholder="Paste item's link" />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Product Name
                <input type="text" placeholder="Product name" />
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
                {data.image && (
                  <button onClick={() => setData({ ...data, image: "" })}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                )}
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Quantity
                <input type="number" min="1" placeholder="Quantity" />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Shop
                <input type="text" placeholder="Shop" />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Category
                <input type="text" placeholder="Category" />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Instruction
                <input type="text" placeholder="Instruction" />
              </label>
            </div>
            <div className={Styles.RowHalf}>
              <label>
                Label
                <input
                  type="text"
                  placeholder="Label"
                  value={Label.key}
                  onChange={(e) => setLabel({ ...Label, key: e.target.value })}
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
                  if (!Label.key || !Label.value) {
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
                      { key: Label.key, value: Label.value },
                    ],
                  });
                  setLabel({ key: "", value: "" });
                }}
              >
                Add New Label
              </button>
            </div>
            {data.labels.length > 0 &&
              data.labels.map((item, i) => (
                <p className={Styles.Tags}>
                  {item.key}:{item.value}
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
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </span>
                </p>
              ))}
            <div className={Styles.RowFull}>
              <button style={{ width: "100%" }}>Make Request</button>
            </div>
          </div>
        </div>
      </div>
    </User>
  );
}

export default Dashboard;
