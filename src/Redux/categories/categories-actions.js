import axios from "axios";
import { category as actions } from "../actionTypes";
const url = {
  getCategories: () => "https://rich-swimsuit-seal.cyclic.app/api/category",
};

const setLoading = (loading) => ({
  type: actions.SET_CATEGORIES_LOADING,
  loading,
});

const setCategories = (categories) => ({
  type: actions.SET_CATEGORIES,
  categories,
});

export const getCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.get(url.getCategories());
    dispatch(setCategories(result.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};
