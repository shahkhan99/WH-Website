import React, { Component } from "react";
import Slider from "react-slick";
import "./assets/styles/home_page_slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export var NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    //  <div
    //    classNameName={classNameName}
    //    style={{ ...style, display: "block", background: "transparent" }}
    //    onClick={onClick}
    //  />
    <img
      className={className}
      src={require("./assets/images/right.png")}
      onClick={onClick}
    />
  );
};

export var PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    //  <div
    //    classNameName={classNameName}
    //    style={{ ...style, display: "block", background: "green" }}
    //    onClick={onClick}
    //  />
    <img
      className={className}
      src={require("./assets/images/left.png")}
      onClick={onClick}
    />
  );
};

export class HomeSlider extends Component {
  render() {
    let {
      slidesToShowTotal,
      slidesToScrollTotal,
      slidesToShowL,
      slidesToShowMD,
      slidesToShowSM,
      slidesToScrollL,
      slidesToScrollMD,
      slidesToScrollSM,
    } = this.props;
    const settings = {
      dots: false,
      // infinite: true,
      speed: 500,
      slidesToShow: slidesToShowTotal,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slidesToShowL,
            slidesToScroll: 1,
            // infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 2,
          },
        },
        {
          breakpoint: 426,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { index, ...props } = this.props;
    return (
      <Slider {...settings} className="react-slick-slider">
        {this.props.children}
      </Slider>
    );
  }
}
