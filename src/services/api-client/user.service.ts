import axios from "axios";

import { IResponse } from "models/Response";

const APIs = {
  SIGNUP: "/api/auth/signup",
  INFO: "/api/user/info",
};

export const signup = async (values) => {
  const { data }: { data: IResponse } = await axios.post(APIs.SIGNUP, values);
  return data;
};

export const fetchUserInfo = async () => {
  const { data }: { data: IResponse } = await axios.get(APIs.INFO);
  return data.data;
};
