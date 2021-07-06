import React, { Component } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './assets/css/app.css'

export var NextArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <img
        src={require('./assets/images/right.png')}
        onClick={onClick}
        style={{ width: '50px', height: 50 }}
      />
    )
  }
  
  export var PrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <img
        src={require('./assets/images/left.png')}
        onClick={onClick}
        style={{ width: '50px', height: 50 }}
      />
    )
  }

  
export class CommunitySlider extends Component {
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        arrows: true,
        // centerMode:true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        className: 'pp-slider',
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
  
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      }
      const { index, ...props } = this.props
      return (
        <Slider {...settings}>
            {this.props.children}
        </Slider>
      )
    }
  }
  