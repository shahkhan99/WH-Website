import React, { Component, Fragment } from "react";
import "./assets/styles/plans_page.css";

import ReactCardFlip from "react-card-flip";
import $ from "jquery";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
import { GetAllFaq } from "../../Services/Admin-Service";

// Slider
import {
  PlansSlider,
  AminitiesSlider,
  NextArrow,
  PrevArrow,
} from "../../components/Slider/PlansPage-Slider/index";
// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";

//database
import { GetAllLocation } from "../../Services/Admin-Service";

import { MDBBtn, MDBCollapse } from "mdbreact";

export class FlipElement extends React.Component {
  render() {
    return (
      <ReactCardFlip
        isFlipped={this.props.isFlipped}
        flipDirection="horizontal"
      >
        {this.props.frontComponent}
        {this.props.backComponent}
      </ReactCardFlip>
    );
  }
}

export default class PlansPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isFlipped1: false,
      isFlipped2: false,
      isFlipped3: false,
      isFlipped4: false,
      bookATour: false,
      metropoleSelected: true,
      pechsSelected: false,
      sideDrawerOpen: false,
      locations: [],
      selectLocations: "",
      faqs: [],
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

  handleClick = (i) => {
    // e.preventDefault();
    // console.log(e);
    this.setState({
      [[`isFlipped${i}`]]: !this.state[`isFlipped${i}`],
    });
  };
  FetchLocation = () => {
    GetAllLocation("all").then((docs) => {
      this.setState({ locations: docs, selectLocations: docs[0].locName });
    });
  };
  FetchFaqs = () => {
    GetAllFaq("all").then((docs) => {
      this.setState({ faqs: docs });
    });
  };
  componentDidMount() {
    this.FetchLocation();
    this.FetchFaqs();
    $(".button.primary").click(function () {
      for (let index = 0; index < 34; index++) {
        $(".button").append('<span class="particles-circle">' + "</span>");
      }
      if (!$(".button").hasClass("active")) {
        $(this).parent().stop().addClass("active");
        setTimeout(function () {
          $(".button").parent().removeClass("active");
          $(".particles-circle").remove();
        }, 1000);
      }
    });
    (function ($) {
      $.fn.visible = function (partial) {
        var $t = $(this),
          $w = $(window),
          viewTop = $w.scrollTop(),
          viewBottom = viewTop + $w.height(),
          _top = $t.offset().top,
          _bottom = _top + $t.height(),
          compareTop = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

        return compareBottom <= viewBottom && compareTop >= viewTop;
      };
    })($);

    var win = $(window);

    var allMods = $(".module");

    allMods.each(function (i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("already-visible");
      }
    });

    win.scroll(function (event) {
      allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in");
        }
      });
    });
    setTimeout(() => {
      this.handleClick(1);
    }, 1500);
    setTimeout(() => {
      this.handleClick(2);
    }, 2000);
    setTimeout(() => {
      this.handleClick(3);
    }, 2500);
    setTimeout(() => {
      this.handleClick(4);
    }, 3000);
  }

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  renderFaq = (question, allText, questionNumber) => {
    return (
      <>
        <div
          className="faq-main-div"
          style={
            {
              // width: '50%',
            }
          }
          onClick={this.toggleCollapse(`questionNumber-${questionNumber}`)}
        >
          <div
            className="faq-toggle-div"
            style={{
              display: "flex",
              flexDirection: "row",
              alignitems: "center",
              marginTop: 20,
            }}
          >
            <img
              src={require("./assets/images/bullets.png")}
              style={{ width: 15, height: 30 }}
            />
            <p
              className={"faq-text"}
              style={{
                marginTop: 5,
                marginLeft: 10,
                textAlign: "justify",
                width: "80%",
                cursor: "pointer",
              }}
            >
              {question}
            </p>
          </div>
          <MDBCollapse
            id={`questionNumber-${questionNumber}`}
            isOpen={this.state.collapseID}
          >
            {allText &&
              allText.map((ans, i) => {
                return (
                  <p
                    style={{
                      width: "80%",
                      marginLeft: "23px",
                      marginTop: "10px",
                    }}
                  >
                    {/* <img src={require('./assets/images/bullets.png')} /> */}
                    {ans}
                  </p>
                );
              })}
          </MDBCollapse>
        </div>
      </>
    );
  };

  render() {
    let { bookATour, metropoleSelected, pechsSelected } = this.state;
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        {
          <BookATourModal
            open={this.state.bookATour}
            close={() => {
              this.setState({ bookATour: false });
            }}
          />
        }
        {/* NAV SECTION */}
        <Nav
          page="RML"
          activeScreen="Plans"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <section className="hero module">
          <div className="wrapper">
            <div className="left">
              <div className="box">
                <FlipElement
                  isFlipped={this.state.isFlipped1}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(1);
                      }}
                      src={require("./assets/images/black.jpg")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(1);
                      }}
                      src={require("./assets/images/plans (1).jpg")}
                    />
                  }
                />
              </div>
              <div className="box zac ">
                <FlipElement
                  isFlipped={this.state.isFlipped2}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(2);
                      }}
                      src={require("./assets/images/lightgrey.jpg")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(2);
                      }}
                      src={require("./assets/images/plans (2).jpg")}
                    />
                  }
                />
              </div>
              <div className="box">
                <FlipElement
                  isFlipped={this.state.isFlipped3}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(3);
                      }}
                      src={require("./assets/images/darkred.jpg")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(3);
                      }}
                      src={require("./assets/images/plans (3).jpg")}
                    />
                  }
                />
              </div>
              <div className="box zac">
                <FlipElement
                  isFlipped={this.state.isFlipped4}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(4);
                      }}
                      src={require("./assets/images/gray.jpg")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(4);
                      }}
                      src={require("./assets/images/4.jpg")}
                    />
                  }
                />
              </div>
            </div>
            {/* HERO SECTION - RIGHT  */}
            <div className="right hero-right-planspage">
              <br />
              <h1 className="inline">re</h1>
              <div className="line"></div>
              <br />
              <h1>build</h1>
              <h5>your dream</h5>
              <p className="font-sm font-gray">
                Workhall is a physical social network powered by diversity in
                backgrounds and beliefs. By inclusion, we strengthen each other
                and provide a solid foundation for progress.
              </p>

              <div className="button-area">
                <a
                  className="button primary btn"
                  onClick={() => {
                    this.setState({ bookATour: !this.state.bookATour });
                  }}
                >
                  BOOK A TOUR
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* STEPS SECTION */}
        <section className="steps module">
          <div className="steps-area">
            <span className="s">01.</span>
            <span className="divider"></span>
            <span>02.</span>
            <span className="divider"> </span> <span>03.</span>
            <span className="divider"></span>
            <span>04.</span>
          </div>
          <div className="step-gap-area"></div>
        </section>
        {/*  LOCATION AND PLANS SECTION  */}
        <section className="welcome-section">
          <div className="wrapper mini">
            <div style={{ position: "relative" }}>
              {/*<div class="div-signature">
           <span class="signature-text" type="text" > ℯ𝓍𝓅𝓇ℯ𝓈𝓈</span>
                  </div>*/}
              <div>
                <div className="locations-and-plans-title-area module">
                  <p>
                    <h1>locations</h1>
                    <h1 className="color-primary">and plans</h1>
                  </p>
                </div>
                <div className="locations-and-plans-filter-button-area-module">
                  {this.state.locations.map((loc, i) => {
                    return (
                      <div>
                        <button
                          // title={this.state.selectLocations=="ittehad"?"Express":""}
                          onClick={() =>
                            this.setState({ selectLocations: loc.locName })
                          }
                          className={`${
                            this.state.selectLocations === loc.locName
                              ? "filter-btn-active"
                              : "filter-btn-inactive"
                          }`}
                        >
                          {loc.locName}

                          <span
                            className={
                              loc.locName == "ittehad" ? "tooltip-text" : "too"
                            }
                          >
                            {" "}
                            Express
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* <button
              onClick={()=>this.setState({metropoleSelected:true,pechsSelected:false})}
                className={`${
                  metropoleSelected === true
                    ? 'filter-btn-active'
                    : 'filter-btn-inactive'
                }`}
              >
                metropole
              </button>
              <button
              onClick={()=>this.setState({metropoleSelected:false,pechsSelected:true})}
                className={`${
                  pechsSelected === true
                    ? 'filter-btn-active'
                    : 'filter-btn-inactive'
                }`}
              >
                pechs
              </button> */}
              </div>
            </div>

            {/* <div className="our-amenities-content-area"> */}
            {/* <PlansSlider/> */}
            {/* </div> */}
          </div>
        </section>
        <section className="our-amenities-section module">
          <div className="wrapper mini">
            <div className="our-amenities-content-area">
              {/* {this.state.metropoleSelected ? 
              <PlansSlider type='metropole'/> : <PlansSlider type='pechs' />
              } */}
              <PlansSlider type={this.state.selectLocations} />
            </div>
          </div>
        </section>
        {/* {FAQS SECTION} */}
        <section className="faq-section module">
          <div className="faq-wrapper">
            <h1 style={{ letterSpacing: 5 }}>
              faq<span className="color-primary">'s</span>
            </h1>
            <p>
              Our team’s always happy to help. Reach out to us by email at
              hello@workhall.co for more queries.
            </p>

            <div className={"bullets-wrapper"}>
              {this.state.faqs.map((faq, i) => {
                return this.renderFaq(faq.question, faq.faq, i);
              })}
            </div>
          </div>
        </section>
        {/* {OUR AMENITIES SECTION} */}
        <section className="our-amenities-section module">
          <div className="wrapper mini">
            <div className="our-amenities-content-area">
              <p className="amenities-title">
                <h5 className="color-primary">OUR</h5>
                <h1>amenities</h1>
              </p>
              <AminitiesSlider />
              <br />
            </div>
          </div>
        </section>

        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
