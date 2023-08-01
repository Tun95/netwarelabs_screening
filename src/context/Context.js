import axios from "axios";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { getError } from "../components/utilities/util/Utils";
import { request } from "../base url/BaseUrl";

export const Context = createContext();

//CartItems Fetching
const initialState = {
  loading: true,
  error: "",

  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},

    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",

    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    //FETCH SETTINGS
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //FETCH CATEGORY
    case "FETCH_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CATEGORY_SUCCESS":
      return { ...state, loading: false, categories: action.payload };
    case "FETCH_CATEGORY_FAIL":
      return { ...state, loading: false, error: action.payload };

    //FETCH SIZES
    case "FETCH_SIZE_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SIZE_SUCCESS":
      return { ...state, loading: false, sizes: action.payload };
    case "FETCH_SIZE_FAIL":
      return { ...state, loading: false, error: action.payload };

    //FETCH BANNER
    case "FETCH_BANNER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BANNER_SUCCESS":
      return { ...state, loading: false, banners: action.payload };
    case "FETCH_BANNER_FAIL":
      return { ...state, loading: false, error: action.payload };

    //ADD TO CART
    case "CART_ADD_ITEM":
      const newItem = action.payload;

      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    //REMOVE FROM CART
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, error: "", cart: { ...state.cart, cartItems } };
    }

    //CART CLEAR
    case "CART_CLEAR":
      return {
        ...state,
        cart: { cartItems: [] },
      };

    //CART_ADD_ITEM_FAIL
    case "CART_ADD_ITEM_FAIL":
      return { ...state, error: action.payload };

    //SIGN IN & SIGN OUT
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };

    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}api/settings`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        window.scrollTo(0, 0);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, [dispatch]);

  //==============
  //FETCH ALL CATEGORY
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}api/category/alphabetic`);
        dispatch({ type: "FETCH_CATEGORY_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_CATEGORY_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  //==============
  //FETCH ALL SIZE
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}api/size`);
        dispatch({ type: "FETCH_SIZE_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_SIZE_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  //FETCH ALL BANNER
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}api/banner`);
        dispatch({ type: "FETCH_BANNER_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_BANNER_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const value = {
    state,
    dispatch,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
