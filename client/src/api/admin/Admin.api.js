import axios from "axios";
const baseURL = "http://localhost:5000/api";

const adminSignIn = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/admin/admin-sign-in`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  return await axios(config);
};

const adminSignUp = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/admin/admin-sign-up`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const getPendingItems = async (data) => {
  var config = {
    method: "get",
    url: `${baseURL}/admin/PendingItems`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopAdmin")}`,
    },
  };

  return await axios(config);
};

const updateItemStatus = async (data, id) => {
  var config = {
    method: "post",
    url: `${baseURL}/item/update-status/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopAdmin")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const getItemById = async (id) => {
  var config = {
    method: "get",
    url: `${baseURL}/item/item/${id}`,
    headers: {},
  };

  return await axios(config);
};

const getOrder = async (type) => {
  var config = {
    method: "get",
    url: `${baseURL}/admin/Orders/${type}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopAdmin")}`,
    },
  };

  return await axios(config);
};

const getOrderById = async (id) => {
  var config = {
    method: "get",
    url: `${baseURL}/admin/Order/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopAdmin")}`,
    },
  };

  return await axios(config);
};

export {
  adminSignIn,
  adminSignUp,
  getPendingItems,
  updateItemStatus,
  getItemById,
  getOrder,
  getOrderById,
};
