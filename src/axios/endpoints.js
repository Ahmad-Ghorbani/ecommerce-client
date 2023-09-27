export const CATEGORIES = "/api/category";

export const PRODUCTS = (page, category, sort, search) =>
  `/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`;

export const USER = "user/infor";

export const ADD_TO_CART = "/user/addcart";
