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
    console.log(product, "handle");
    if (!isLogged) return alert("Please login to continue buying");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      await addCart([...cart, { ...product, quantity: 1 }], token);
      setCart([...cart, { ...product, quantity: 1 }]);
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
