import axios from "axios";
import { product as actions } from "../actionTypes";

const url = {
  getProducts: (page, category, sort, search) =>
    `https://rich-swimsuit-seal.cyclic.app/api/products?limit=${
      page * 9
    }&${category}&${sort}&title[regex]=${search}`,
};

const setLoading = (loading) => ({
  type: actions.SET_PRODUCTS_LOADING,
  loading,
});

const setProducts = (products) => ({
  type: actions.SET_PRODUCTS,
  products,
});

const setResult = (result) => ({
  type: actions.SET_PRODUCTS_RESULTS,
  result,
});

export const getProducts =
  (page = 1, category = "", sort = "", search = "") =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await axios.get(
        url.getProducts(page, category, sort, search)
      );

      dispatch(setProducts(result?.data?.products));
      dispatch(setResult(result?.data?.results));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error.message);
    }
  };
