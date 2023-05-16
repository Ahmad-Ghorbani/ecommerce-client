import { combineReducers } from "redux";
import productData from "../products/products-reducer";
import categoryData from "../categories/categories-reducer";
// sorted alphabetically
const rootReducer = combineReducers({
  productData,
  categoryData,
});

export default rootReducer;
