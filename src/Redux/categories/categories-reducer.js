import { category as actions } from "../actionTypes";

const initialState = {
  categories: null,
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };

    case actions.SET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};

export default categoryReducer;
