import { callApi } from "../utilities/apicaller";

export const checkUser = (body) => {
  return callApi("post", "check-user", body);
};

export const signup = (body) => {
  return callApi("post", "signup", body);
};
