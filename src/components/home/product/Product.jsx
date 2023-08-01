import React, { useEffect, useReducer } from "react";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import { getError } from "../../utilities/util/Utils";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Filters from "./Filters";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";
import ProductItems from "./ProductItems";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
function Product() {
  //==============
  //PRODUCT FILTER
  //==============
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const color = sp.get("color") || "all";
  const size = sp.get("size") || "all";
  const price = sp.get("price") || "all";
  const brand = sp.get("brand") || "all";
  const order = sp.get("order") || "all";
  const discount = sp.get("discount") || "all";
  const page = parseInt(sp.get("page") || 1);

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      products: [],
      simProducts: [],
      loading: true,
      error: "",
    });
  //============
  //PRODUCT FETCHING
  //============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${request}api/products/shop?page=${page}&query=${query}&order=${order}&discount=${discount}&category=${category}&color=${color}&size=${size}&price=${price}&brand=${brand}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        // window.scrollTo(0, 0);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [category, brand, color, size, page, price, query, order, discount]);

  //=======
  //FILTER
  //=======
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterColor = filter.color || color;
    const filterSize = filter.size || size;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    const filterBrand = filter.brand || brand;
    const filterDiscount = filter.discount || discount;
    return `/?query=${filterQuery}&category=${filterCategory}&order=${sortOrder}&discount=${filterDiscount}&color=${filterColor}&size=${filterSize}&price=${filterPrice}&brand=${filterBrand}`;
  };
  console.log(products);

  // Scroll to the "Store Items" header when the pagination is clicked
  const handlePaginationClick = (event, pageNumber) => {
    const targetElement = document.getElementById("store-items");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <section className="shop mt background" id="shop">
        <div className=" shop-grid ">
          <div className="">
            <div className="filter">
              <Filters
                products={products}
                brand={brand}
                color={color}
                size={size}
                category={category}
                price={price}
                countProducts={countProducts}
                getFilterUrl={getFilterUrl}
              />
            </div>
            <div className="heading d_flex mt">
              <div className="heading-left row  f_flex">
                <h2>Product List</h2>
              </div>
              <div className="heading-right row "></div>
            </div>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products?.length === 0 && (
                  <div className="product_not">
                    <span className="product-not">
                      <MessageBox>No Product Found </MessageBox>
                    </span>
                  </div>
                )}
                <div className="product-content">
                  <ProductItems products={products} dispatch={dispatch} />
                </div>
                {countProducts > 6 ? (
                  <div className="pagination">
                    <Pagination
                      page={page}
                      count={pages}
                      defaultPage={1}
                      //classes={{ ul: classes.ul }}
                      renderItem={(item) => (
                        <PaginationItem
                          className={`${
                            item.page !== page
                              ? "paginationItemStyle"
                              : "paginationItemStyle active"
                          }`}
                          component={Link}
                          to={`/?page=${item.page}&query=${query}&category=${category}&color=${color}&size=${size}&price=${price}&brand=${brand}&order=${order}&discount=${discount}`}
                          {...item}
                          onClick={(e) => handlePaginationClick(e, item.page)}
                        />
                      )}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
