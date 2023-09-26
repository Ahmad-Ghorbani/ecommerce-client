import { BASE_APP_URL } from "../constants";
import Api from "./axiosInstance";

export const getCategoriesME = async () => {
  const { data } = await Api.get(`${BASE_APP_URL}/api/category`);
  return data;
};
