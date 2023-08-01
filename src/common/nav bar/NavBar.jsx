import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/shopfinity.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Context } from "../../context/Context";

function NavBar({ setIsCartOpen, isCartOpen }) {
  //=======
  //CONTEXT
  //=======
  const { state } = useContext(Context);
  const { cart } = state;
  return (
    <div className="nav_bar">
      <div className="container">
        <div className="content c_flex">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="list ">
            <ul className="c_flex">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#shop">Shop</a>
              </li>
              <li>
                <Link to="/">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="icons c_flex">
            <div className="favorite c_flex">
              <div className="bagde l_flex">
                <span>2</span>
              </div>
              <FavoriteBorderIcon className="mui_icons" />
            </div>
            <div
              className="favorite c_flex"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <div className="bagde l_flex">
                <span>{cart.cartItems.length}</span>
              </div>
              <LocalMallOutlinedIcon className="mui_icons" />{" "}
            </div>
            <AccountCircleOutlinedIcon className="mui_icons" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
