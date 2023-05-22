import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";
import Loading from "../../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions";

function Products() {
  const state = useContext(GlobalState);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const [productsFilters, setProductsFilters] = useState({
    category: "",
    search: "",
    sort: "",
  });

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productData.products);

  useEffect(() => {
    const { category, sort, search } = productsFilters;
    dispatch(getProducts(page, category, sort, search));
  }, [productsFilters, page]); //eslint-disable-line

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "https://rich-swimsuit-seal.cyclic.app/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`https://rich-swimsuit-seal.cyclic.app/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await destroyImg;
      await deleteProduct;
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
    // setCheckedProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    // setCheckedProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
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
      <Filters
        filterProps={(value) => {
          setProductsFilters(value);
        }}
      />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete all</button>
        </div>
      )}
      <div className="products">
        {products &&
          products.map((product) => {
            return (
              <ProductItem
                product={product}
                key={product._id}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            );
          })}
      </div>
      <LoadMore PageNumber={(value) => setPage(value)} />
      {products?.length === 0 && <Loading />}
    </>
  );
}

export default Products;
