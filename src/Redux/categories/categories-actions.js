import axios from "axios";
import { category as actions } from "../actionTypes";
import { BASE_APP_URL } from "../../constants";
const url = {
  getCategories: () => `${BASE_APP_URL}/api/category`,
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
    alert(error.message);
  }
};
