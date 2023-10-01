import Api from "./axiosInstance";
import {
  ADD_CART,
  ADD_TO_CART,
  CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  DESTROY,
  DESTROY_IMAGE,
  LOGIN,
  LOGOUT,
  PRODUCTS,
  REFRESH_TOKEN,
  REGISTER_SUBMIT,
  SUBMIT_PRODUCT,
  UPLOAD_IMAGE,
  USER,
} from "./endpoints";

export const getCategories = async () => {
  const { data } = await Api.get(CATEGORIES);
  return data;
};

export const getProducts = async (page, category, sort, search) => {
  const { data } = await Api.get(PRODUCTS(page, category, sort, search));
  return data;
};

export const getUser = async (token) => {
  try {
    const { data } = await Api.get(USER, {
      headers: { Authorization: token },
    });

    return data;
  } catch (err) {
    alert(err.response.data.msg);
  }
};

export const addCart = async (cart, token) => {
  await Api.patch(
    ADD_CART,
    { cart: [...cart] },
    {
      headers: { Authorization: token },
    }
  );
};

export const refreshToken = async () => {
  const { data } = await Api.get(REFRESH_TOKEN, {
    withCredentials: true,
  });

  return data;
};

export const logoutUser = async () => {
  await Api.get(LOGOUT);
};

export const loginSubmit = async (user) => {
  await Api.post(
    LOGIN,
    { ...user },
    {
      withCredentials: true,
    }
  );
};

export const registerSubmit = async (user) => {
  await Api.post(REGISTER_SUBMIT, { ...user });
};

export const addToCart = async (cart, token) => {
  await Api.patch(
    ADD_TO_CART,
    { cart },
    {
      headers: { Authorization: token },
    }
  );
};

export const createCategory = async (onEdit, category, token, id) => {
  if (onEdit) {
    const { data } = await Api.put(
      CREATE_CATEGORY(id),
      { name: category },
      {
        headers: { Authorization: token },
      }
    );

    alert(data.msg);
  } else {
    const { data } = await Api.post(
      CREATE_CATEGORY(),
      { name: category },
      {
        headers: { Authorization: token },
      }
    );

    alert(data.msg);
  }
};

export const deleteCategory = async (id, token) => {
  const { data } = await Api.delete(DELETE_CATEGORY(id), {
    headers: { Authorization: token },
  });

  return data;
};

export const uploadImage = async (formData, token) => {
  const { data } = await Api.post(UPLOAD_IMAGE, formData, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: token,
    },
  });

  return data;
};

export const destroy = async (images, token) => {
  await Api.post(
    DESTROY,
    { public_id: images.public_id },
    { headers: { Authorization: token } }
  );
};

export const submitProduct = async (onEdit, product, images, token) => {
  if (onEdit) {
    await Api.put(
      SUBMIT_PRODUCT(product._id),
      { ...product, images },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } else {
    await Api.post(
      SUBMIT_PRODUCT(),
      { ...product, images },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
};

export const destroyImg = async (public_id, token) => {
  await Api.post(
    DESTROY_IMAGE,
    { public_id },
    {
      headers: { Authorization: token },
    }
  );
};

export const deleteProduct = async (id, token) => {
  await Api.delete(DELETE_PRODUCT(id), {
    headers: { Authorization: token },
  });
};
