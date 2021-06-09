import React from "react";
import { getOrderById } from "../../../api/admin/Admin.api";
import Admin from "../../Admin";
import Styles from "./OrderDetail.module.scss";

function OrderDetail(props) {
  const [data, setData] = React.useState();

  const fetchData = async () => {
    try {
      const resp = await getOrderById(props.match.params.itemId);
      resp.data.success && setData(resp.data.orders);
    } catch (err) {}
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return <Admin>{data && data.status}</Admin>;
}

export default OrderDetail;
