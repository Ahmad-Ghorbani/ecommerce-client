import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import close from "./icon/close.svg";
import cartIcon from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_APP_URL } from "../../constants";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get(`${BASE_APP_URL}/user/logout`);

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        {/* <li>
          <Link to="/history">History</Link>
        </li> */}
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="menu icon" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Ahmad Shop"} </Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login or register</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={close} alt="close icon" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span> {cart.length} </span>
          <Link to="/cart">
            <img src={cartIcon} alt="cart icon" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
