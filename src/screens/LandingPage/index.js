import React, { Component } from "react";
import "./assets/styles/landing_page.css";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";
import ReactCardFlip from "react-card-flip";
import Loader from "react-loader-spinner";
import $ from "jquery";

//Nav
import Nav from "../../components/Nav/index";
//Footer
import Footer from "../../components/Footer/index";
// Slider
import {
  HomeSlider,
  NextArrow,
  PrevArrow,
} from "../../components/Slider/HomePage-Slider/index";
// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";

import { MDBBtn, MDBCollapse } from "mdbreact";
import LazyLoad from "react-lazyload";
import { lazyload } from "react-lazyload";
import { GetAllPartner } from "../../Services/Admin-Service";

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

export default class LandingPage extends Component {
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
    loader: true,
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  FetchPartners = () => {
    GetAllPartner("all").then((docs) => {
      this.setState({ Partners: docs, loader: false });
    });
  };
  componentDidMount() {
    this.FetchPartners();
    // $(".button.primary").click(function () {
    //   for (let index = 0; index < 34; index++) {
    //     $(".button").append('<span class="particles-circle">' + "</span>")
    //   }
    //   if (!$(".button").hasClass("active")) {
    //     $(this).parent().stop().addClass("active")
    //     setTimeout(function () {
    //       $(".button").parent().removeClass("active")
    //       $(".particles-circle").remove()
    //     }, 1000)
    //   }
    // })
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

  // toggleCollapse = (collapseID) => () => {
  //   this.setState((prevState) => ({
  //     collapseID: prevState.collapseID !== collapseID ? collapseID : '',
  //   }))
  // }
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  handleClick = (i) => {
    this.setState({
      [[`isFlipped${i}`]]: !this.state[`isFlipped${i}`],
    });
  };

  render() {
    let { collapseID } = this.state;
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <>
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
          activeScreen="Home"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <section className="hero module">
          {/* <HomeSlider
            slidesToShowTotal={1}
            slidesToScrollTotal={1}
            slidesToShowL={1}
            slidesToScrollL={1}
            slidesToShowMD={1}
            slidesToScrollMD={1}
            slidesToShowSM={1}
            slidesToScrollSM={1}
          > */}
          {/* SLIDE 1 */}
          {/*  HERO SECTION - LEFT  */}
          <div className="wrapper">
            <div className="left">
              <div className="box ">
                <LazyLoad height={200}>
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
                        src={require("./assets/images/1.jpg")}
                      />
                    }
                  />
                </LazyLoad>
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
                      src={require("./assets/images/2.jpg")}
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
                      src={require("./assets/images/3.jpg")}
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
              <h1>think</h1>
              <h5>your workspace</h5>
              <p className="font-sm font-gray">
                We create spaces for people to do their life's best work with
                the backing of a robust community. Be it a shared working space,
                or a private office suite, we have designed beautiful offices at
                stunning locations with fantastic views.
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
        {/* <button onClick={()=>this.drawerToggleClickHandler()}>
  click
</button> */}
        {/* STEPS SECTION */}
        <section className="partners-logo-div">
          <div className="partner-logos">
            {this.state.loader ? (
              <div className="revealer-wrapper-load">
                <Loader
                  type="BallTriangle"
                  secondaryColor="green"
                  color="#ca312b"
                  height={100}
                  width={100}
                  // timeout={3000}
                />
              </div>
            ) : (
              <div className="partner-logos">
                {this.state.Partners.map((info, i) => {
                  return (
                    <div>
                      <img
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                        src={info.images[0]}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/*  WELCOME SECTION  */}
        <section className="welcome-section module">
          <div className="wrapper mini">
            <div className="top-area">
              <div className="title-area">
                <h5>WELCOME</h5>
                <h5>
                  <span className={"span-red"}>TO</span>
                </h5>
                <h1>work hall</h1>
              </div>
              <div className="img-area">
                <img src={require("./assets/images/fh.jpg")}></img>
              </div>
            </div>

            <div className="content-area font-lg">
              <p>
                The workplace of today has changed radically. Old rules are
                getting broken. Today, people are resisting the urge to comply
                with traditional office structures by breaking down corporate
                hierarchies and redefining business culture.
              </p>

              <p>
                The rise of new social developments has put Work Hall in a
                unique position. The newly vigilant world has brought diverse
                demands for office settings that allow for safety, sanitation,
                choice, and flexibility in running a business. More than ever,
                there is a need for a flexible workspace that offers more to you
                and your business than any corporate norm.
              </p>

              <p>
                Before starting Work Hall, we knew we didn't need another office
                building. We needed high-powered workspaces, where people could
                collaborate and grow together. We wanted to create a physical,
                social network inside a building where everyone belonging to
                different businesses could come together and work as one vibrant
                community with opportunity and accessibility.
              </p>
              {!collapseID && (
                <div
                  className="btn-area"
                  onClick={this.toggleCollapse(`welcome-to-workhall-collapse`)}
                >
                  <a className="button secondary lg">
                    <div></div>Read More
                  </a>
                </div>
              )}

              <MDBCollapse
                id={`welcome-to-workhall-collapse`}
                isOpen={collapseID}
              >
                <p>
                  Whether you need a shared or virtual workspace or a private
                  office suite, Work Hall creates an environment for evolving
                  businesses to grow. Alongside other inspirational workers who
                  are adept in their profession is a sure way of promoting
                  collaboration. Our skilled team of creative heads, architects,
                  designers, and managers excel at redefining experiences that
                  increase productivity and encourage talent retention.
                </p>
                {collapseID && (
                  <div
                    className="btn-area"
                    onClick={this.toggleCollapse(
                      `welcome-to-workhall-collapse`
                    )}
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

        {/*  SLIDER SECTION  */}
        <section className="slider-section module">
          <div className="wrapper mini wp-mini-slider-section">
            <div className="background-image">
              <div className="image-text">
                <h1>
                  our plans are designed to cater to all your workplace needs
                </h1>
              </div>
              <HomeSlider
                slidesToShowTotal={3}
                slidesToScrollTotal={6}
                slidesToShowL={3}
                slidesToScrollL={2}
                slidesToShowMD={2}
                slidesToScrollMD={1}
                slidesToShowSM={1}
                slidesToScrollSM={1}
              >
                {/* air */}
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "air-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    {console.log(collapseID)}
                    <p class="hp-slider-box-title">air</p>
                    <p class="hp-slider-box-text">
                      Access to an open spot in our shared space. You'll choose
                      a new spot every time you come in. Hook your laptop, pick
                      a desk, and get to work.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Freelancers and consultants
                      <br />
                      Individual owner companies
                    </p>
                  </div>
                </div>

                {/* x */}
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "x-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">x</p>
                    <p class="hp-slider-box-text">
                      Assigned, permanent stations in our shared space. Rent a
                      desk of your own and return to the same location every
                      day. Desktops may be set up and left overnight.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Startups and small companies
                      <br />
                      2-3-person silos
                    </p>
                  </div>
                </div>

                {/* box */}
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "box-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">box</p>
                    <p class="hp-slider-box-text">
                      Lockable private office suite in a fully enclosed space.
                      Available for teams of any size, our private offices give
                      you secure spaces and a way to keep things more
                      confidential.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Team spaces
                      <br />
                      Growing teams
                      <br />
                    </p>
                  </div>
                </div>

                {/* virtual */}
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "b-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">virtual office</p>
                    <p class="hp-slider-box-text">
                      A physical address for your business. You'll choose a new
                      spot every time you come in. Hook your laptop, pick a
                      desk, and get to work.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Freelancers and consultants
                      <br />
                      Individual owner companies
                    </p>
                  </div>
                </div>

                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "after-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">after-hours</p>
                    <p class="hp-slider-box-text">
                      You can work out of Work Hall's shared space from 8 pm to
                      3 am without ever being disturbed. <br />
                      <br />
                      Best for:
                      <br />
                      Organizations with overseas clients where the time barrier
                      is a severe cause for concern.
                    </p>
                  </div>
                </div>

                {/* enterprise */}
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "weekend-collapse"
                        ? "hp-slide1"
                        : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">weekend-only</p>
                    <p class="hp-slider-box-text">
                      Got spare time over the weekend for your new business but
                      didn't need it for the entire month? Our weekend only plan
                      ensures guaranteed shared space for all your office needs.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Freelancers
                    </p>
                  </div>
                </div>
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "enterprise" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">enterprise</p>
                    <p class="hp-slider-box-text">
                      Your fully autonomous private office suites designed
                      keeping your specific business needs in mind for team
                      spaces of 10 or more at any of our locations. <br />
                      <br />
                      Best for: <br />
                      Large teams
                      <br />
                      National or multinational organizations
                    </p>
                  </div>
                </div>
                <div class="hp-slide-box-border-wrap">
                  <div
                    class={
                      collapseID == "custom-collapse" ? "hp-slide1" : "hp-slide"
                    }
                  >
                    <p class="hp-slider-box-title">custom fit-outs</p>
                    <p class="hp-slider-box-text">
                      Work with our design experts to create your ideal office
                      suite from the ground up with your choice of approved
                      artwork and layouts with a personal touch of branding.
                      <br />
                      <br />
                      Best for:
                      <br />
                      Companies which requires regular visitation
                    </p>
                  </div>
                </div>
              </HomeSlider>
            </div>
          </div>
        </section>

        {/*  COLOURFULL BOXES SECTION  */}
        <section className="colourfullboxes-section module">
          <div className="wrapper mini">
            <div className="red box-body module">
              <div className="box-image">
                <img src={require("./assets/images/weaving design.JPG")}></img>
              </div>
              <div className="box-content">
                <div className="box-title">
                  <h3>
                    Weaving design
                    <br />
                    with community
                  </h3>
                </div>
                <div className="box-text">
                  <p>
                    Work Hall's design philosophy is centered around members of
                    our community. Well-designed spaces are not just a question
                    of taste or aesthetics. They shape our ideas about who we
                    are in the world, what work we do, and what we deserve.
                    <br />
                    <br />
                    The magic happens when our prominent multicultural family
                    members are willing to drop everything in a heartbeat to
                    help out a fellow Work Hall member. We think that's what
                    truly sets us apart.
                  </p>
                </div>
              </div>
            </div>

            <div className="yellow-special module">
              <div className="yellow box-body">
                <div className="box-image">
                  <img
                    src={require("./assets/images/Spirit-of-the-palce-web.jpg")}
                  ></img>
                </div>
                <div className="box-content">
                  <div className="box-title">
                    <h3>
                      Spirit of
                      <br />
                      the place
                    </h3>
                  </div>
                  <div className="box-text">
                    <p>
                      We strive to reimagine, reshape, and re-humanize the
                      architecture of our spaces to encourage human connection,
                      support innovation, and provide an opportunity for all,
                      and that is our genius arrangement.
                      <br />
                      <br />
                      Our spirit lies in love for connecting people and building
                      businesses around a meaningful society. It has a lot to do
                      with staying true to who we are as an extension of
                      ourselves because that's what matters the most to us -
                      doing what we believe is great work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="green box-body module">
              <div className="box-image">
                <img
                  src={require("./assets/images/Community is our soul.JPG")}
                ></img>
              </div>
              <div className="box-content">
                <div className="box-title">
                  <h3>
                    Community
                    <br />
                    is our soul
                  </h3>
                </div>
                <div className="box-text">
                  <p>
                    Work Hall is a community powered by people from different
                    backgrounds and beliefs, each with a beautiful story to
                    tell. These organic interactions bring our office space to
                    life because it gives a feeling of identity and belonging.
                    <br />
                    <br />
                    Our community nurtures collective growth amongst
                    individuals. We believe in fostering a competent tomorrow
                    where diverse ideas and businesses can flourish under one
                    roof. We follow our hearts, and we believe that we are more
                    powerful when we empower each other. The art of running and
                    setting up a business is flexible, just like the plans we
                    offer. Being around all kinds of businesses brings us two
                    steps ahead of the evolving needs of the modern-day
                    workplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  WANT TO KNOW MORE DIVIDER  */}
        <section className="module">
          <div className="want-to-know-more">
            <div className="want-to-know-more-content">
              <h3>Want to know more?</h3>
              <a
                className="button primary lg"
                onClick={() => {
                  this.setState({ bookATour: !this.state.bookATour });
                }}
              >
                BOOK A TOUR
              </a>
            </div>
          </div>
        </section>
        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </>
    );
  }
}
