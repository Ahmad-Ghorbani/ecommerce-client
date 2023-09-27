import { useState, useEffect } from "react";
import { getCategories } from "../axios/api";

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const handleGetCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    handleGetCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoriesAPI;
