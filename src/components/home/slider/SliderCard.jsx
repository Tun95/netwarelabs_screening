import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context.js";
import { Fade } from "react-awesome-reveal";

function SliderCard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
    responsive: [
      {
        breakpoint: 839,
        settings: {
          dots: false,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const { state } = useContext(Context);
  const { banners } = state;
  return (
    <>
      <Slider {...settings} className="slick-slider">
        {banners?.map((item, index) => (
          <div key={index} className="box d_flex top">
            <div className="left">
              <Fade cascade direction="down" triggerOnce damping={0.3}>
                <small>Trending product in 2023</small>
                <h1>{item.title}</h1>
                <p className="description">{item.descriptions}</p>
                <a href="#store">
                  <button
                    onClick={() => navigate(`/?category=${item.category}`)}
                    className="btn_primary uppercase"
                  >
                    Shop Now
                  </button>
                </a>
              </Fade>
            </div>
            <div className="right">
              <img src={item.background} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default SliderCard;
