import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../../GlobalState";
import { getCategories } from "../../../redux/actions";

const Filters = ({ filterProps }) => {
  const state = useContext(GlobalState);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryData.categories);

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  useEffect(() => {
    dispatch(getCategories());
  }, []); //eslint-disable-line

  useEffect(() => {
    filterProps({ category, sort, search });
  }, [category, sort, search]); //eslint-disable-line

  const handleCategory = ({ target: { value } }) => {
    setCategory(value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span className="filter">Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories?.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={({ target: { value } }) => setSearch(value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select
          value={sort}
          onChange={({ target: { value } }) => setSort(value)}
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
