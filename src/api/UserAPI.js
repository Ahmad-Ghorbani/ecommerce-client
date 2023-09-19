import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_APP_URL } from "../constants";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(`${BASE_APP_URL}/user/infor`, {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          setIsAdmin(res.data.role === 1 ? true : false);

          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        `${BASE_APP_URL}/user/addcart`,
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else alert("This product has been added to cart");
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
  };
};

export default UserAPI;
