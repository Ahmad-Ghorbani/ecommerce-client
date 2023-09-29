import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";
import Loading from "../../utils/loading/Loading";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import { deleteProduct, destroyImg } from "../../../axios/api";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleDeleteProduct = async (id, public_id) => {
    try {
      setLoading(true);

      await destroyImg(public_id, token);
      await deleteProduct(id, token);

      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked)
        handleDeleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Filters />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete all</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product._id}
              isAdmin={isAdmin}
              deleteProduct={handleDeleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
