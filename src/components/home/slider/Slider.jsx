import React from "react";
import SliderCard from "./SliderCard";
import "./styles.scss";

function Slider() {
  return (
    <>
      <section className="homeSlide contentWidth">
        <div className="container">
          <SliderCard />
        </div>
      </section>
    </>
  );
}

export default Slider;
