export const CATEGORIES = "/api/category";
export const PRODUCTS = (page, category, sort, search) =>
  `/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`;
export const USER = "user/infor";
export const ADD_TO_CART = "/user/addcart";
export const ADD_CART = "/user/addcart";
export const REFRESH_TOKEN = "/user/refresh_token";
export const LOGOUT = "/user/logout";
export const LOGIN = "/user/login";
export const REGISTER_SUBMIT = "/user/register";
export const CREATE_CATEGORY = (id) =>
  id ? `/api/category/${id}` : "/api/category/";
export const DELETE_CATEGORY = (id) => `/api/category/${id}`;
export const UPLOAD_IMAGE = "/api/upload";
export const DESTROY = "/api/destroy";
export const SUBMIT_PRODUCT = (id) =>
  id ? `/api/products/${id}` : "/api/products";
export const DESTROY_IMAGE = '"api/destroy"';
export const DELETE_PRODUCT = (id) => `api/products/${id}`;
