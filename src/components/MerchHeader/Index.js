import React, { Component } from "react";
import "./assets/styles/merch-header.css";
import $ from "jquery";
import { Link, animateScroll as scroll } from "react-scroll";

export class MearchHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.slideShow();
  }

  slideShow() {
    var slideIndex = 0;
    showSlides();

    function showSlides() {
      var i;
      var slides = document.getElementsByClassName("img-slide");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 5000); // Change image every 2 seconds
    }
  }

  render() {
    return (
      <div class="merch-header">
        <div className="merch-header-bg"></div>
        <div className="mh-content">
          <div className="mh-left">
            <div class="m-logo"></div>
            <div class="merch-head-text">
              <h1 class="heading-merch">Exotic Minimal Office Desk</h1>
              <p class="para-merch">
                Merch by Work Hall is a new initative designed to promote
                forword-thinking products designed exclusively by Work Hall
              </p>
              <Link
                // activeClass="active"
                to="merch-products"
                // spy={true}
                smooth={true}
                offset={-30}
                duration={800}
              >
                <div class="buy-now">Buy Now</div>
              </Link>
            </div>
          </div>
          <div className="mh-right">
            <div className="img-slide fade">
              <img
                src={require("./assets/images/4.jpg")}
                className="slide-img"
              />
            </div>
            <div className="img-slide fade">
              <img
                src={require("./assets/images/5.jpg")}
                className="slide-img"
              />
            </div>
            <div className="img-slide fade">
              <img
                src={require("./assets/images/6.jpg")}
                className="slide-img"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
