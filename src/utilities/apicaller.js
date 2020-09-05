import axios from "axios";

const SERVER_URL = "https://api.raisely.com/v3/";
const config = {
  headers: { "Content-Type": "application/json" },
};

export const callApi = async (method, endpoint, body) => {
  return axios
    .post(SERVER_URL + endpoint, body, config)
    .then((res) => res)
    .catch((error) => {
      console.log(error);
      alert("Ran into a problem. Please try again after sometime.");
      return "sorry";
    });
};
