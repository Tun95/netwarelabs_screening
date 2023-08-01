import React from "react";
import Wrapper from "../../components/home/wrapper/Wrapper";
import Product from "../../components/home/product/Product";
import Slider from "../../components/home/slider/Slider";

function HomeScreen() {
  return (
    <div className="home_screen background">
      <Slider />
      <div className="container ">
        <Wrapper />
        <Product />
      </div>
    </div>
  );
}

export default HomeScreen;
