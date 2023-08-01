import React from "react";
import Wrapper from "../../components/home/wrapper/Wrapper";
import Shop from "../../components/home/shop/Shop";
import Slider from "../../components/home/slider/Slider";

function HomeScreen() {
  return (
    <div className="home_screen background">
      <Slider />
      <div className="container ">
        <Wrapper />
        <Shop />
      </div>
    </div>
  );
}

export default HomeScreen;
