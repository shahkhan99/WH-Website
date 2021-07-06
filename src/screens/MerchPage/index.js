import React, { Component } from "react";

import "./assets/styles/merch_page.css";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
// Slider
// import { HomeSlider } from '../../components/Slider/HomePage-Slider/index'
import { MearchHeader } from "../../components/MerchHeader/Index";
// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";
import Slider from "infinite-react-carousel";
export default class MerchPage extends Component {
  constructor() {
    super();
    this.state = {
      sideDrawerOpen: false,
      products: [
        {
          id: "identity",
          image: require(`./assets/images/new images/9.jpg`),
        },
        {
          id: "voir",
          image: require(`./assets/images/new images/1.png`),
        },
        {
          id: "tron",
          image: require(`./assets/images/new images/5.png`),
        },
      ],
    };
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  SimpleSlider = () => {};

  componentDidMount() {}

  render() {
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    {
    }
    return (
      <div>
        {/* NAV SECTION */}
        <Nav
          activeScreen="Merch"
          page="RML-merch"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <section className="header-module">
          <MearchHeader />
          <div className="m-header-bottom">
            <div class="m-border">
              <div>
                <img
                  src={require("./assets/images/Vector.png")}
                  className="m-border-logo"
                />
              </div>
              <div className="m-border-text">
                <h3 className="m-border-heading">Best Quality</h3>
                <p class="m-border-para">
                  All our desks uses the best material and choices for our
                  customers
                </p>
              </div>
            </div>
            <div class="m-border">
              <div>
                <img
                  src={require("./assets/images/Vector1.png")}
                  className="m-border-logo"
                />
              </div>
              <div className="m-border-text">
                <h3 className="m-border-heading">Easy Installment</h3>
                <p class="m-border-para">
                  Free shipping everytime you buy a desk from us without
                  exception
                </p>
              </div>
            </div>
            <div class="m-border">
              <div>
                <img
                  src={require("./assets/images/Vector2.png")}
                  className="m-border-logo"
                />
              </div>
              <div className="m-border-text">
                <h3 className="m-border-heading">Warranty</h3>
                <p class="m-border-para">
                  Everytime you buy our products, you will get a warranty
                  without exception
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="m-about">
          <div className="ma-inner">
            <div className="ma-left">
              <div className="ma-img1">
                <img
                  src={require("./assets/images/new images/a1.jpg")}
                  height="100%"
                  width="100%"
                  alt="voir"
                  className="ma-images"
                />
              </div>
              <div className="ma-img2">
                <img
                  src={require("./assets/images/new images/a2.jpg")}
                  height="100%"
                  width="100%"
                  className="ma-images"
                />
              </div>

              <div className="ma-img3">
                <img
                  src={require("./assets/images/new images/a3.jpg")}
                  height="100%"
                  width="100%"
                  className="ma-images"
                />
              </div>
            </div>
            <div className="ma-right">
              <div className="ma-right-inner">
                <h1 className="ma-heading">About Us</h1>
                <p className="ma-text">
                  Sleek, stylish, and commanding. Influenced by modern day
                  workplace, our range of contemporary office desks are sure to
                  make a strong visual impact in any office environment.
                </p>
                <br />
                <p className="ma-text">
                  We pride ourselves on our friendly and approachable service
                  and it’s important to us, that our customers know we care. Our
                  products reflect our values that we follow, using innovative
                  techniques, sustainability, and minimalism.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="product-section" id="merch-products">
          <div className="product-heading">
            <div
              style={{
                width: "70%",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h2 className="p-head">refining the tone of your space</h2>
              <p style={{ color: "#525252", marginBottom: '50px' }}>
                designed in a way that whether it's your office or home or even
                a corridor, the sleekness and beauty that it carries will
                compliment everything around it.
              </p>
            </div>
          </div>
          {/* product images */}
          <div className="product-images">
            {this.state.products.map((product, i) => {
              return (
                <div className="mp-background">
                  <div className="pro-image">
                    <img src={product.image} className="pro-img" />
                  </div>

                  <div
                    className="product-btn"
                    onClick={() => window.open(`/merch/${product.id}`, "_self")}
                  >
                    VIEW DETAILS
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/*<section className="sec-client">
          <div className="client-re">
            <h2 className="client-line">
              client reviews are mightier than the sword
            </h2>
          </div>
          <div className="carousel-initialized">
            <Slider dots>
              <div>
                <h3>ssadasdsa</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
            </Slider>
          </div>
        </section>/*}

        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-dividers-merch"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
