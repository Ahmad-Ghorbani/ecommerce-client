import { product as actions } from "../actionTypes";

const initialState = {
  products: null,
  loading: false,
  result: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case actions.SET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case actions.SET_PRODUCTS_RESULTS:
      return {
        ...state,
        result: action.result,
      };

    default:
      return state;
  }
};

export default productReducer;
