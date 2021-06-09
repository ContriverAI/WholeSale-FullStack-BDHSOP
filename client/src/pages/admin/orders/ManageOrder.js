import React from "react";
import { Link } from "react-router-dom";
import { getOrder } from "../../../api/admin/Admin.api";
import Admin from "../../Admin";
import "./ManageOrder.scss";
import MaterialTable from "material-table";
import TableIcon from "../../../components/TableIcon/TableIcon";

function OrderTab({ title }) {
  const [data, setData] = React.useState([]);

  const loadData = async () => {
    try {
      const resp = await getOrder(title);
      console.log(resp);
      resp.data.success && setData(resp.data.orders);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [title]);

  const columns = [
    {
      title: "View",
      render: (x) => (
        <Link to={`/order-details/${x._id}`} className={"Order_Row"}>
          VIEW
        </Link>
      ),
    },
    { title: "Order ID", field: "_id" },
    {
      title: "Order Date",
      field: "date",
      render: (x) => <>{new Date(x.date).toLocaleDateString()}</>,
    },
    {
      title: "Order Time",
      field: "date",

      render: (x) => <>{new Date(x.date).toLocaleTimeString()}</>,
    },
    { title: "Amount", field: "amount" },
    { title: "Delivery", field: "deliveryAmount" },
    { title: "Total", field: "total" },
    {
      title: "Payment Status",
      field: "paymentStatus",
      render: (x) => {
        if (x.paymentStatus === "payment submitted") {
          return <p className="Payment_Submitted">{x.paymentStatus}</p>;
        } else if (x.paymentStatus === "under verification") {
          return <p className="Payment_Verification">{x.paymentStatus}</p>;
        } else if (x.paymentStatus === "payment rejected") {
          return <p className="Payment_Rejected">{x.paymentStatus}</p>;
        }
      },
    },
  ];

  return (
    <div className={"OrderTab_Container"}>
      <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
      {
        data.length > 0 && (
          <MaterialTable
            icons={TableIcon}
            columns={columns}
            data={data}
            title="New Orders"
            options={{ exportButton: true, pageSizeOptions: [15, 25, 50, 100] }}
          />
        )
        // data.map((item) => (
        //   <Link
        //     to={`/order-details/${item._id}`}
        //     className={"Order_Row"}
        //     key={item._id}
        //   >
        //     <div>
        //       {" "}
        //       <h2>Order ID : {item?._id}</h2>
        //       <h6>Order Date : {}</h6>
        //       <p>Total Price : {item?.total}</p>
        //     </div>
        //   </Link>
        // ))
      }
    </div>
  );
}

function ManageOrder() {
  const [active, setActive] = React.useState("Created");

  const tab = {
    Created: <OrderTab title={"created"} />,
    Accepted: <OrderTab title={"accepted"} />,
    Rejected: <OrderTab title={"rejected"} />,
  };

  const toggles = () => {
    const side = document.getElementsByClassName("side");
    side[0].classList.toggle("mystyle");

    const btn = document.getElementsByClassName("arrow");
    btn[0].classList.toggle("mystyle");
  };

  const activeToggler = (i) => {
    const tabs = document.querySelectorAll(".Selector");
    tabs.forEach((item) => {
      item.classList.remove("Active");
    });
    tabs[i].classList.add("Active");
  };

  return (
    <Admin>
      <div className={"ManageOrder_Container"}>
        <div className={`Sidebar side`}>
          <div className={"arrow"}>
            <button onClick={toggles}>
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <div
            className={"Selector Active"}
            onClick={() => {
              activeToggler(0);
              setActive("Created");
              toggles();
            }}
          >
            <p>Created</p>
          </div>
          <div
            className={"Selector"}
            onClick={() => {
              activeToggler(1);
              setActive("Accepted");
              toggles();
            }}
          >
            <p>Accepted</p>
          </div>
          <div
            className={"Selector"}
            onClick={() => {
              activeToggler(2);
              setActive("Rejected");
              toggles();
            }}
          >
            <p>Rejected</p>
          </div>
        </div>
        <div className={"main"} onClick={toggles}>
          {tab[active]}
        </div>
      </div>
    </Admin>
  );
}

export default ManageOrder;
