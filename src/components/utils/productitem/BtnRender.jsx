import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const token = state.token;
  const addCart = state.userAPI.addCart;
  const cart = state.userAPI.cart;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          {" "}
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => {
              console.log(product, "productBtn");

              addCart(product);
            }}
          >
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
