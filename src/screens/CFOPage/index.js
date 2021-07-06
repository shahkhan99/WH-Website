import React, { Component } from "react";

import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";
import "./assets/styles.css";
//Nav
import Nav from "../../components/Nav/index";
//Footer
import Footer from "../../components/Footer/index";
// Slider
import Bookafreeconsultatio from "../../components/Bookafreeconsultatio/index";
import Slide from "react-reveal/Slide";
// import { Zoom } from "@material-ui/core";
import HeadShake from "react-reveal/HeadShake";
import { lazyload } from "react-lazyload";

lazyload({
  height: 200,

  offset: 100,
});

export default class CFOPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isOpen: "welcome-to-workhall-collapse",
    isFlipped1: false,
    isFlipped2: false,
    isFlipped3: false,
    isFlipped4: false,
    bookATour: false,

    collapseID: "",
    sideDrawerOpen: false,
    card: [
      {
        heading: "Reduce Time Spent",
        text: "It will reduce time spent on run-of-the-mill tasks and allow your company to direct all energy into strategic planning initiatives.",
        icons: require("./assets/images/new Icons/1.png"),
      },
      {
        heading: "Access to Our Professional Network",
        text: " You will be able to leverage Work Hall’s professional network and expertise information that may not be available internally",
        icons: require("./assets/images/new Icons/2.png"),
      },
      {
        heading: "Reduce Financial Risks",
        text: "We will reduce financial risks involved in non-compliance of legislative, corporate and technology changes.",
        icons: require("./assets/images/new Icons/3.png"),
      },
      {
        heading: "Go Digital",
        text: "Go digital by using the latest software to document your financial information that makes reporting easier and less prone to mistakes.          ",
        icons: require("./assets/images/new Icons/4.png"),
      },
      {
        heading: "Highest Online Security",
        text: "We back up all your data and meet the highest online security standards for data storage.",
        icons: require("./assets/images/new Icons/5.png"),
      },
      {
        heading: "Enable More Flexibility",
        text: "We enable more flexibility and allow tailor-made solutions specific to your budget. .",
        icons: require("./assets/images/new Icons/6.png"),
      },
      {
        heading: "Access Financial Reports",
        text: "Access financial reports available at the click of a button which will equip you to drill down into business and financial knowledge.",
        icons: require("./assets/images/new Icons/7.png"),
      },
    ],
    secondcard: [
      {
        icons: require("./assets/images/new Icons/8.png"),
        text: "Preparation of financial statements using IFRS",
      },
      {
        icons: require("./assets/images/new Icons/9.png"),
        text: "Tailor-made management reports",
      },
      {
        icons: require("./assets/images/new Icons/10.png"),
        text: "Inventory management and reporting    ",
      },
      {
        icons: require("./assets/images/new Icons/11.png"),
        text: "Preparation of tax returns and reports    ",
      },
      {
        icons: require("./assets/images/new Icons/12.png"),
        text: "Company registration, formation, updation and liquidation    ",
      },
    ],
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    // console.log(this.state.bookATour);
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div class="main-div">
        {
          <Bookafreeconsultatio
            open={this.state.bookATour}
            close={() => {
              this.setState({ bookATour: false });
            }}
          />
        }

        <section>
          <Nav
            page="RML-cfo"
            activeScreen="CFO"
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
        </section>
        <section class="sec-1">
          <div className="bg-img-div">
            <div class="cfo-header-bg"></div>
            <div class="div-1">
              <div class="div-2">
                <div class="cfo-sec">
                  <div class="cfo-img-div">
                    <img
                      class="img-cfo"
                      src={require("./assets/images/cfo.png")}
                    ></img>
                  </div>
                  <div class="bt-div"></div>
                  <div>
                    <p class="para">
                      Work Hall has always stood strong in servicing
                      entrepreneurs and businesses by working closely with them,
                      almost everyday. That puts us in a unique position to
                      understand businesses from the ground up.
                    </p>
                  </div>

                  <div class="bt-div">
                    <button
                      class="bt"
                      onClick={() => {
                        this.setState({ bookATour: !this.state.bookATour });
                      }}
                    >
                      Book a free consultation
                    </button>
                  </div>
                </div>
                <div class="back4-imgs-main">
                  <div class="hero-img1">
                    <Slide right duration={1000}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={require(".//assets/images/Hero/1.png")}
                      ></img>
                    </Slide>
                  </div>
                  <div class="upper-imgs-main">
                    <div class="h3-img">
                      <div class="hero-img3">
                        <Slide right duration={2000}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "7px",
                            }}
                            src={require(".//assets/images/cfo images/1.jpg")}
                          ></img>
                        </Slide>
                      </div>
                    </div>
                    <div class="upper-imgs">
                      <div class="hero-img4">
                        <Slide right duration={3000}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "7px",
                            }}
                            src={require(".//assets/images/cfo images/2.jpg")}
                          ></img>
                        </Slide>
                      </div>
                      <div class="hero-img2">
                        <Slide right duration={4000}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "7px",
                            }}
                            src={require(".//assets/images/cfo images/4.jpg")}
                          ></img>
                        </Slide>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="sec6">
          <div class="ourclients">
            <div class="client-heading">
              <h2 class="heading-client">Trusted by startups and businesses</h2>
            </div>
            <div class="clients-logo">
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/1.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/2.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/3.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/4.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/5.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/6.png")}
                ></img>
              </div>
              <div class="client-img-div">
                <img
                  class="client-img"
                  src={require("./assets/images/cfo logos/7.png")}
                ></img>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="bg2-div">
            <div class="main-1">
              <div class="about">
                <Slide bottom>
                  <div>
                    <h2 class="heading-au">Numbers make or break a company.</h2>

                    <p class="para-about">
                      We believe it’s better to have two minds working on the
                      financial success of the company. As your strategic
                      partners, CFO by Work Hall will be leading your finances
                      and accounting so you can focus on building your business,
                      customers and core team.
                    </p>
                  </div>
                </Slide>
              </div>
              <div class="imgs-div">
                <HeadShake duration={2000}>
                  <div class="picture">
                    <img class="img1css" />
                  </div>
                </HeadShake>
              </div>
            </div>
          </div>
        </section>
        <section class="sec-2a">
          <div class="bg-div2">
            <div class="colective-div">
              <div class="img-main">
                <HeadShake>
                  <div class="picture">
                    <img class="img2css" />
                  </div>
                </HeadShake>
              </div>
              <div class="heading-div">
                <Slide bottom>
                  <div>
                    {" "}
                    <h2 class="heading1">
                      We’ve been in the industry long enough.
                    </h2>
                    <p class="p2">
                      We know that budgets are scarce. Hiring and training eats
                      up all the dollars and you seldom get what you’re paying
                      for. Our dedicated team of finance professionals will be
                      deployed to service your company’s finances and
                      accounting.
                    </p>
                  </div>
                </Slide>
              </div>
            </div>
          </div>
        </section>

        <section class="sec4">
          <div class="ourser">
            <div>
              <div class="cont-upper">
                <div class="cont">
                  <div class="count-inner">
                    <div class="circle">
                      <img
                        class="icon1"
                        src={require("./assets/images/Feature Icons/1.png")}
                      ></img>
                    </div>
                    <div>
                      <text class="text-cont">10+</text>
                    </div>
                    <text class="text-of-cont">Projects completed</text>
                  </div>
                  <div class="count-inner">
                    <div class="circle">
                      <img
                        class="icon1"
                        src={require("./assets/images/Feature Icons/2.png")}
                      ></img>
                    </div>
                    <div>
                      <text class="text-cont">7+</text>
                    </div>
                    <text class="text-of-cont">Companies served</text>
                  </div>
                  <div class="count-inner">
                    <div class="circle">
                      <img
                        class="icon1"
                        src={require("./assets/images/Feature Icons/3.png")}
                      ></img>
                    </div>
                    <div>
                      <text class="text-cont">18+</text>
                    </div>
                    <text class="text-of-cont">
                      Combined years of experience
                    </text>
                  </div>
                </div>
              </div>
            </div>
            <div class="para-gap2">
              <h2
                style={{
                  textdecorationline: "underline",
                  textdecorationstyle: "solid",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                What we do
              </h2>
            </div>
            <div class="box-main">
              {this.state.secondcard.map((data, i) => {
                return (
                  <div class="card-box1-main">
                    <div class="boxs-2">
                      <div class="cfo-icons">
                        <img src={data.icons} />
                      </div>
                    </div>
                    <div class="cfo-text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="btn-class-reg">
              <button
                class="bt"
                onClick={() => {
                  this.setState({ bookATour: !this.state.bookATour });
                }}
              >
                Book a free consultation
              </button>
            </div>
          </div>
        </section>
        <section class="sec3">
          <div class="whycfo">
            <div class="para-gap">
              <Slide bottom>
                <div>
                  <h2 class="heading-au">
                    A consultation with CFO by Work Hall will help your company:
                  </h2>
                </div>
              </Slide>
            </div>
            <div class="box-main">
              {this.state.card.map((data, i) => {
                return (
                  <div class="boxs">
                    <div class="cfg-card-heading">
                      <div class="cfo-card-icons">
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={data.icons}
                        />
                      </div>
                      <div class="cfo-card-head">
                        <h1 class="cfo-ch">{data.heading}</h1>
                      </div>
                    </div>
                    <div class="cfo-card-text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-dividers "></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
