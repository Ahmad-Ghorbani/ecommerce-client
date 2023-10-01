import { useState, useEffect } from "react";
import { getUser, addCart } from "../axios/api";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const handleGetUser = async () => {
        const data = await getUser(token);

        setIsLogged(true);
        setIsAdmin(data.role === 1 ? true : false);

        setCart(data.cart);
      };

      handleGetUser();
    }
  }, [token]);

  const handleAddCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await addCart(cart, product, token);
    } else alert("This product has been added to cart");
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: handleAddCart,
  };
};

export default UserAPI;
