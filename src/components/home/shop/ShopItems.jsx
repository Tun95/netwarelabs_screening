import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import Rating from "../../utilities/rating/Ratings";
import { request } from "../../../base url/BaseUrl";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { RWebShare } from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ShopItems({ products, dispatch }) {
  const { state, dispatch: ctxDispatch, convertCurrency } = useContext(Context);
  const {
    cart: { cartItems },
  } = state;

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  //Product Quantity
  const [quantity, setQuantity] = useState(1);

  //===========
  //ADD TO CART
  //===========
  const addToCartHandler = async (item) => {
    const { data } = await axios.get(`${request}api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry, Product stock limit reached or out of stock", {
        position: "bottom-center",
      });
      return;
    } else {
      toast.success(`${item.name} is successfully added to cart`, {
        position: "bottom-center",
      });
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...item,
        discount: data.discount,
        seller: data.seller,
        sellerName: item?.seller?.seller?.name,
        quantity,
      },
    });
  };

  console.log(products);

  //PAGE URL
  const pageURL = process.env.REACT_APP_FRONTEND_URL;

  return (
    <>
      {products?.map((product, index) => (
        <div className="box" key={index}>
          <div className="product mtop">
            <div className="img">
              {product.discount > 0 ? (
                <span className="discount">{product.discount}% Off</span>
              ) : null}
              <Link to={`/`}>
                <img src={product.image} alt="" />
              </Link>
              <div className="product-like">
                {product.flashdeal ? <i className="fa fa-bolt"></i> : ""}
                <span className="related_icon l_flex">
                  <RWebShare
                    data={{
                      text: `Check out this cool ${product.name}`,
                      url: `${pageURL}/product/${product.slug}`,
                      title: product.name,
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <ShareIcon className="related_icons" />
                  </RWebShare>
                </span>
              </div>
            </div>
            <div className="product-details">
              <Link to={`/`}>
                <h3>{product.name}</h3>
              </Link>
              <div className="rate">
                <Rating rating={product.rating} />
              </div>
              <div className="price">
                {product.discount > 0 ? (
                  <div className="a_flex">
                    <div className="price">
                      $
                      {product.price - (product.price * product.discount) / 100}
                    </div>
                    <s className="discounted">${product.price}</s>
                  </div>
                ) : (
                  <div className="price">${product.price}</div>
                )}
                {product.countInStock === 0 ? (
                  <button className="disabled l_flex" disabled>
                    <DoDisturbIcon className="" />
                  </button>
                ) : (
                  <button
                    className="dark-btn"
                    onClick={() => addToCartHandler(product)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShopItems;
