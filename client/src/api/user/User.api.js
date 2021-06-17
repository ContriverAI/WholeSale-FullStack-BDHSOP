import axios from "axios";
const baseURL = "http://localhost:5000/api";

const userSignIn = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/user/user-sign-in`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return await axios(config);
};

const userSignUp = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/user/user-sign-up`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...data,
      address: [data.address],
    },
  };
  //   console.log(config.data);
  return await axios(config);
};

const createNewProductRequest = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/item/create-item`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const getUsersProducts = async () => {
  var config = {
    method: "get",
    url: `${baseURL}/user/items`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
    },
  };

  return await axios(config);
};

const deleteProductById = async (id) => {
  var config = {
    method: "post",
    url: `${baseURL}/item/delete-item/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
    },
  };

  return axios(config);
};

const createNewOrder = async (data) => {
  var config = {
    method: "post",
    url: `${baseURL}/order/new-order`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const getAllOrders = async () => {
  var config = {
    method: "get",
    url: `${baseURL}/order/my-orders`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
    },
  };

  return await axios(config);
};

const updatePaymentScreenshot = async (payment, id) => {
  var data = {
    payment: payment,
  };

  var config = {
    method: "post",
    url: `${baseURL}/order/update-payment/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const updateQuantityBeforeOrder = async (id, qty) => {
  var data = {
    qty,
  };

  var config = {
    method: "post",
    url: `${baseURL}/item/update-quantity/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("BDshopUser")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

export {
  userSignIn,
  userSignUp,
  createNewProductRequest,
  getUsersProducts,
  deleteProductById,
  createNewOrder,
  getAllOrders,
  updatePaymentScreenshot,
  updateQuantityBeforeOrder,
};
