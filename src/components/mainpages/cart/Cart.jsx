import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import PayPal from "./PayPal";
import { addToCart } from "../../../axios/api";

function Cart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((previous, item) => {
        return previous + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity++;
      }
    });

    setCart([...cart]);
    addToCart(cart, token);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
      }
    });

    setCart([...cart]);
    addToCart(cart, token);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?"))
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

    setCart([...cart]);
    addToCart(cart, token);
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: $ {total}</h3>
        <PayPal />
      </div>
    </div>
  );
}

export default Cart;
