import React, { Component } from "react";
import "./assets/styles/story_page.css";

import ReactCardFlip from "react-card-flip";
import $ from "jquery";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
// Slider
import {
  StorySlider,
  NextArrow,
  PrevArrow,
} from "../../components/Slider/StoryPage-Slider/index";

import BookATourModal from "../../components/BookATourModal/index";

import { MDBCollapse } from "mdbreact";
import { lazyload } from "react-lazyload";

lazyload({
  height: 200,

  offset: 100,
});

class FlipElement extends React.Component {
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

export default class StoryPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isFlipped1: false,
      isFlipped2: false,
      isFlipped3: false,
      isFlipped4: false,
      collapseID: "",
      bookATour: false,
      sideDrawerOpen: false,
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
  // this.handleClick = this.handleClick.bind(this);

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  handleClick = (i) => {
    // e.preventDefault();
    // console.log(e);
    this.setState({
      [[`isFlipped${i}`]]: !this.state[`isFlipped${i}`],
    });
  };

  componentDidMount() {
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

  render() {
    let { collapseID } = this.state;
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
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
        {/*   NAVIGATION  */}
        <Nav
          page="RML"
          activeScreen="Story"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {/* HERO SECTION */}
        <section className="hero module">
          <div className="wrapper">
            {/*  HERO SECTION - LEFT  */}
            <div className="left">
              <div className="box ">
                <FlipElement
                  isFlipped={this.state.isFlipped1}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(1);
                      }}
                      src={require("./assets/images/black.png")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(1);
                      }}
                      src={require("./assets/images/story.png")}
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
                      src={require("./assets/images/lightgrey.png")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(2);
                      }}
                      src={require("./assets/images/story 2.png")}
                    />
                  }
                />
              </div>
              <div className="box ">
                <FlipElement
                  isFlipped={this.state.isFlipped3}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(3);
                      }}
                      src={require("./assets/images/darkred.png")}
                    />
                  }
                  backComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(3);
                      }}
                      src={require("./assets/images/story 3.png")}
                    />
                  }
                />
              </div>
              <div className="box zac ">
                <FlipElement
                  isFlipped={this.state.isFlipped4}
                  frontComponent={
                    <img
                      className="child"
                      onClick={() => {
                        this.handleClick(4);
                      }}
                      src={require("./assets/images/gray.png")}
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
            {/*  HERO SECTION - RIGHT  */}
            <div className="right">
              <h1 className="inline">re</h1>
              <div className="line"></div>
              <br />
              <h1>work</h1>
              <h5>your workspace</h5>
              <p className="font-sm font-gray">
                We design spaces that help you do your life’s best work. Whether
                you need a shared work space or a private office suite, we
                create uplifting environments that increase productivity and
                encourage collaboration.
              </p>

              <div className="button-area">
                <a
                  onClick={() => {
                    this.setState({ bookATour: !this.state.bookATour });
                  }}
                  className="button primary btn"
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
        {/*  INTRO SECTION  */}
        <section className="intro-section module">
          <div className="wrapper mini">
            <div className="top-area">
              <div className="title-area">
                <h1 style={{ display: "inline-block" }}>
                  humbl
                  <span className={"span-e"}>
                    <h1 style={{ display: "inline-block" }}>e</h1>
                  </span>
                  <br /> beginnings
                </h1>
              </div>
            </div>

            <div className="content-area font-lg">
              <div className="img-area"></div>
              <p>
                Work Hall started by accident because of a failing company that
                couldn't afford to pay rent. Everyone had to be laid off,
                including me. I was distraught. I quit a rewarding career in M &
                A to join the team only to find out that we had to pull the
                plug.
              </p>

              <p>
                Having the entire office to myself while serving the last month,
                I could only frantically think of ways to move on. It was then
                that I convinced the landlord of the building to help me turn
                our office into a workspace so that different businesses could
                share rent while at the same time collaborate and help each
                other grow.
              </p>

              {!collapseID && (
                <div
                  className="btn-area"
                  onClick={this.toggleCollapse(`workhall-story-collapse`)}
                >
                  <a className="button secondary lg">
                    <div></div>Read More
                  </a>
                </div>
              )}

              <MDBCollapse
                id={`workhall-story-collapse`}
                isOpen={this.state.collapseID}
              >
                <p>
                  My finance experience taught me to work on my system and run
                  numbers efficiently, but my vision for Work Hall taught me to
                  look at the story behind those numbers. I spent the latter
                  half of 2017 researching, planning, and validating the
                  business model and subsequently raised seed investment from
                  seasoned investors who believed in me more than they believed
                  in the idea. Work Hall was founded in April 2018.
                </p>

                <p>
                  I've always believed people are magic; the dream was always to
                  build businesses and be around them. I wanted to build
                  something that would make the whole more significant than the
                  sum of its parts. As human beings, our minds are hard-wired to
                  tackle problems, even those we do not have to correct tools to
                  solve. I think the real problems to look for are the ones
                  worth solving. And that is why I built Work Hall.
                </p>

                <p>
                  After combining all the main elements, finally, Work Hall was
                  founded in April 2018.
                </p>

                {collapseID && (
                  <div
                    className="btn-area"
                    onClick={this.toggleCollapse(`workhall-story-collapse`)}
                  >
                    <a className="button secondary lg">
                      <div></div>Read Less
                    </a>
                  </div>
                )}
              </MDBCollapse>
            </div>
          </div>
        </section>

        {/*  OUR VALUES AND SLIDER SECTION  */}
        <section className="slider-section module">
          <div className="wrapper mini">
            <div className="slider-section-content">
              <span className="span-red">OUR</span>
              <h1>values</h1>
              <p className="missiontext">
                Work Hall’s mission and values are the guiding force that create
                our company culture and set the foundation for the work we do –
                building community and creating opportunities for people to
                engage and grow their businesses, is why Work Hall is an
                excellent modern place for you to work.
              </p>

              <StorySlider />
            </div>
          </div>
        </section>
        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/*  FOOTER SECTION  */}
        <Footer />
      </div>
    );
  }
}
