import React, { useContext } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Context } from "../../context/Context";

function Cart({ setIsCartOpen, isCartOpen }) {
  //FETCHING CARTITEMS
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  //============
  //CART QUANTITY
  //============
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`${request}api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  //============
  //REMOVE ITEMS
  //============
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: { _id: item._id, size: item.size, color: item.color },
    });
    toast.success(`${item.name} is successfully removed from cart`, {
      position: "bottom-center",
    });
  };

  //===================
  // CART CLEAR HANDLER
  //===================
  const clearCartHandler = () => {
    ctxDispatch({ type: "CART_CLEAR" });
    localStorage.removeItem("cartItems");
  };

  //========
  //CHECKOUT
  //========
  const navigate = useNavigate();
  const checkoutHandler = () => {
    if (!userInfo) {
      toast.error("You need to log in to proceed to checkout", {
        position: "bottom-center",
      });
      navigate("/");
    } else {
      navigate("/");
    }
  };

  console.log(cartItems);

  const totalPrice = cartItems.reduce(
    (a, c) => a + (c.price - (c.price * c.discount) / 100) * c.quantity,
    0
  );

  return (
    <div className="cart-container">
      {isCartOpen && (
        <div className="cart-dropdown">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="cart-item">
                  <div className="img">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>
                  <div className="cart-item-info ">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="cart-item-quantity">
                      <button
                        disabled={item.quantity === 1}
                        className="cart-quantity-button"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="cart-quantity">{item.quantity}</span>
                      <button
                        disabled={item.quantity === item.countInStock}
                        className="cart-quantity-button"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-remove-button"
                      onClick={() => removeItemHandler(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ${totalPrice}</div>
          <div className="c_flex">
            <button className="cart-clear-button" onClick={clearCartHandler}>
              Clear Cart
            </button>
            <button className="cart-checkout-button" onClick={checkoutHandler}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
