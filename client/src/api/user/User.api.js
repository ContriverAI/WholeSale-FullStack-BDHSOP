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

export { userSignIn, userSignUp };
