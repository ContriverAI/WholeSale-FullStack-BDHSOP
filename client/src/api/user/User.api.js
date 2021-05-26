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
      authorization: `Bearer ${localStorage.getItem("BDshop")}`,
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
      authorization: `Bearer ${localStorage.getItem("BDshop")}`,
    },
  };

  return await axios(config);
};

export { userSignIn, userSignUp, createNewProductRequest, getUsersProducts };
