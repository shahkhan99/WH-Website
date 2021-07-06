import React, { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../MerchPage/assets/styles/merch_page.css";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
import Merchform from "../../components/merch form/merchform";

export default class MerchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      Merchmodal: false,
      tableName: "",
      prod: [],
      products: [
        {
          name: "identity",
          image: [
            require(`./assets/images/new images/7.jpg`),
            require(`./assets/images/new images/8.jpg`),
            require(`./assets/images/new images/9.jpg`),
          ],
          price: 12000,
          delivery: 1000,
          installation: 1000,
          description:
            "The Identity, a table designed by Work Hall marks the origin of the Merch. It's beautiful frame, sleek lines and the texture of the top is lively, vibrant and yet so simple that it can blend easily almost everywhere. We have our love for it and we are sure you will fall in love with it too.",
          link: "https://www.daraz.pk/products/identity-work-from-home-office-tables-i195262707-s1389994078.html?dsource=share&laz_share_info=9499189_100_100_0_8466326_null&laz_token=ad44007d93b2a649a15b920d5c252343",
        },
        {
          name: "voir",
          image: [
            require(`./assets/images/new images/1.png`),
            require(`./assets/images/new images/2.png`),
            require(`./assets/images/new images/3.png`),
          ],
          price: 14000,
          delivery: 1000,
          installation: 1000,
          description:
            "Introducing Voir, with its minimalistic design and comfy tones. The Voir blends easily to every colour and every environment.Making your work space, whether its your office or your home lovable.",
          link: "https://www.daraz.pk/products/voir-work-from-home-office-tables-i195298604-s1390038054.html?dsource=share&laz_share_info=9499184_100_100_0_8466321_null&laz_token=9659f7012baca4834b0fa0834caa3834",
        },
        {
          name: "tron",
          image: [
            require(`./assets/images/new images/4.png`),
            require(`./assets/images/new images/5.png`),
            require(`./assets/images/new images/6.png`),
          ],
          price: 16000,
          delivery: 1000,
          installation: 1000,
          description:
            "With its smooth layered wood grain top and minimalist design, Tron makes you fall in love with it every day. It is designed in a way that whether it's your office or home or even a corridor, the sleekness and beauty that it carries will compliment everything around it.",
          link: "https://www.daraz.pk/products/tron-work-from-home-office-table-i195338269-s1390106216.html?dsource=share&laz_share_info=9499174_100_100_0_8466312_null&laz_token=af2506e641b524202d4597eb8fb97881",
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
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
    let { id } = this.props.match.params;
    this.setState({ tableName: id });
    this.state.products.map((data) => {
      if (data.name == id) {
        this.state.prod.push(data);
      }
    });
    console.log(id);
  }
  renderProducts = () => {
    let { tableName } = this.state;
    if (tableName == "voir") {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((plan, i) => {
          return plan.image.map((img, i) => {
            return (
              <div className="mp-pro-img">
                <img src={img} height="100%" width="100%" />
              </div>
            );
          });
        });
    } else if (tableName == "tron") {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((plan, i) => {
          return plan.image.map((img, i) => {
            return (
              <div className="mp-pro-img">
                <img src={img} height="100%" width="100%" />
              </div>
            );
          });
        });
    } else {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((plan, i) => {
          return plan.image.map((img, i) => {
            return (
              <div className="mp-pro-img">
                <img src={img} height="100%" width="100%" />
              </div>
            );
          });
        });
    }
  };
  renderProductDetails = () => {
    let { tableName } = this.state;
    if (tableName == "voir") {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((pro, i) => {
          return (
            <div>
              <h1 style={{ textAlign: "left", paddingLeft: "0px" }}>
                {pro.name}
              </h1>
              <p class="m-margin-bottom">
                Price:Rs.
                {pro.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>

              <p class="buy-now-btn">
                <div
                  onClick={() => {
                    this.setState({
                      Merchmodal: !this.state.Merchmodal,
                    });
                  }}
                  // alt="Buy Now"
                  // target="_blank"
                >
                  add to cart
                </div>
              </p>

              <p class="m-margin-bottom">
                <b class="des-blod"> Description:</b>
                <br /> {pro.description}
              </p>
            </div>
          );
        });
    } else if (tableName == "identity") {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((pro, i) => {
          return (
            <div className="mp-table-Detail">
              <h1 style={{ textAlign: "left", paddingLeft: "0px" }}>
                {pro.name}
              </h1>

              <p class="m-margin-bottom">
                Price: Rs.
                {pro.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>

              <p class="buy-now-btn">
                <div
                  onClick={() => {
                    this.setState({
                      Merchmodal: !this.state.Merchmodal,
                    });
                  }}
                  alt="Buy Now"
                  target="_blank"
                >
                  add to cart
                </div>
              </p>

              <p class="m-margin-bottom">
                <b class="des-blod"> Description:</b>
                <br /> {pro.description}
              </p>
            </div>
          );
        });
    } else {
      return this.state.products
        .filter((pro, i) => {
          return pro.name == tableName;
        })
        .map((pro, i) => {
          return (
            <div>
              <h1 style={{ textAlign: "left", paddingLeft: "0px" }}>
                {pro.name}
              </h1>

              <p class="m-margin-bottom">
                Price: Rs.{" "}
                {pro.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>

              <p class="buy-now-btn">
                <div
                  onClick={() => {
                    this.setState({
                      Merchmodal: !this.state.Merchmodal,
                    });
                  }}
                  alt="Buy Now"
                  target="_blank"
                >
                  Add to Cart
                </div>
              </p>

              <p class="m-margin-bottom">
                <b class="des-blod"> Description:</b>

                {pro.description}
              </p>
            </div>
          );
        });
    }
  };
  render() {
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <>
        <Nav
          activeScreen="Merch"
          page="RML-merch"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {
          <Merchform
            open={this.state.Merchmodal}
            close={() => {
              this.setState({ Merchmodal: false });
            }}
            product={this.state.prod}
          />
        }
        <div className="products-detail-slider" id="pro-detail">
          <style>{cssstyle}</style>
          <div className="products-image-slider-container">
            <div className="products-image-slider">
              <Slider
                asNavFor={this.state.nav2}
                ref={(slider) => (this.slider1 = slider)}
                arrows={false}
                className={"upper-slider"}
              >
                {this.renderProducts()}
              </Slider>
              <Slider
                asNavFor={this.state.nav1}
                ref={(slider) => (this.slider2 = slider)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                arrows={false}
                className={"bottom-slider"}
              >
                {this.renderProducts()}
              </Slider>
            </div>
            <div className="products-image-details">
              {this.renderProductDetails()}
            </div>
          </div>
        </div>
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </>
    );
  }
}

const cssstyle = `
.container22 {
  margin: 0 auto;
  // padding: 0px 40px 40px 40px;
  width: 400px;
  height:100%;
  display:flex;
  flex-wrap:wrap;
}

.slick-next:before, .slick-prev:before {
    color: #000;
}
`;
