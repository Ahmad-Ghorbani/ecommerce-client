import Api from "./axiosInstance";
import { CATEGORIES, PRODUCTS, USER } from "./endpoints";

export const getCategories = async () => {
  const { data } = await Api.get(CATEGORIES);
  return data;
};

export const getProducts = async (page, category, sort, search) => {
  const { data } = awaitApi.get(PRODUCTS(page, category, sort, search));
  return data;
};

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(USER, {
      headers: { Authorization: token },
    });

    return data;
  } catch (err) {
    alert(err.response.data.msg);
  }
};

export const addToCart = async (cart, product) => {
  await axios.patch(
    `${BASE_APP_URL}/user/addcart`,
    { cart: [...cart, { ...product, quantity: 1 }] },
    {
      headers: { Authorization: token },
    }
  );
};
