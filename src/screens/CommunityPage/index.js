import React, { Component } from "react";
import "./assets/styles/community_page.css";

import ReactCardFlip from "react-card-flip";
import $ from "jquery";
import Loader from "react-loader-spinner";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
// Slider
import { HomeSlider } from "../../components/Slider/HomePage-Slider/index";
// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";
// import { CommunitySlider } from '../../components/Slider/communityPage-Slider/index'
import { MDBBtn, MDBCollapse } from "mdbreact";
// Database
import { GetAllCommunity } from "./../../Services/Admin-Service";
import Blog from "../../components/Blog/index";
import LazyLoad from "react-lazyload";
import { lazyload } from "react-lazyload";

lazyload({
  height: 200,
  once: true,
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
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isFlipped1: false,
      isFlipped2: false,
      isFlipped3: false,
      isFlipped4: false,
      loader: true,
      bookATour: false,
      collapseID: "",
      sideDrawerOpen: false,
      community: [],
      blogs: [
        {
          title: "abcd xyz",
          content: "akjskdbfhasdlbfaksndjasnvljkabvnjaksbvnkjvn alnsvjknfd",
          image: require("./assets/images/CommunityMembersLogosAndPics/Aamir/1.png"),
        },
        {
          title: "abcd xyz",
          content: "akjskdbfhasdlbfaksndjasnvljkabvnjaksbvnkjvn alnsvjknfd",
          image: require("./assets/images/CommunityMembersLogosAndPics/Aamir/1.png"),
        },
        {
          title: "abcd xyz",
          content:
            "akjskdbfhasdlbfaksndjasnvljkabvnjaksbvnkjvn alnsvjknfddnkjvnsjdlkvnjfdnbjfnfbjgfbjdlmjlkmvj km njkonbojsnfdmvjklnmdfjvlnk msdfjclknvm gklxvcmv jgklxvncbmv jkglckvxnc,bm jxkgclvxkcnm jxkgckvb,mdhfvc mhgjvsmkc hnjkvmdchbnvjmcqwertyuiokjhgfdsazxcvbnm,",
          image: require("./assets/images/CommunityMembersLogosAndPics/Aamir/1.png"),
        },
        {
          title: "abcd xyz",
          content:
            "akjskdbfhasdlbfaksndjasnvljkabvnjaksbvnkjvn alnsvjknfddnkjvnsjdlkvnjfdnbjfnfbjgfbjdlmjlkmvj km njkonbojsnfdmvjklnmdfjvlnk msdfjclknvm gklxvcmv jgklxvncbmv jkglckvxnc,bm jxkgclvxkcnm jxkgckvb,mdhfvc mhgjvsmkc hnjkvmdchbnvjmcqwertyuiokjhgfdsazxcvbnm,",
          image: require("./assets/images/CommunityMembersLogosAndPics/Aamir/1.png"),
        },
        {
          title: "abcd xyz",
          content: "akjskdbfhasdlbfaksndjasnvljkabvnjaksbvnkjvn alnsvjknfd",
          image: require("./assets/images/CommunityMembersLogosAndPics/Aamir/1.png"),
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
  FetchCommunity = () => {
    GetAllCommunity("all").then((docs) => {
      this.setState({ community: docs, loader: false });
    });
  };
  componentDidMount() {
    this.FetchCommunity();
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
          activeScreen="Community"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <section className="hero module">
          <HomeSlider
            slidesToShowTotal={1}
            slidesToScrollTotal={1}
            slidesToShowL={1}
            slidesToScrollL={1}
            slidesToShowMD={1}
            slidesToScrollMD={1}
            slidesToShowSM={1}
            slidesToScrollSM={1}
          >
            <div className="wrapper">
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
                        src={require("./assets/images/black.jpg")}
                      />
                    }
                    backComponent={
                      <img
                        className="child"
                        onClick={() => {
                          this.handleClick(1);
                        }}
                        src={require("./assets/images/community (1).jpg")}
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
                        src={require("./assets/images/community (2).jpg")}
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
                        src={require("./assets/images/darkred.jpg")}
                      />
                    }
                    backComponent={
                      <img
                        className="child"
                        onClick={() => {
                          this.handleClick(3);
                        }}
                        src={require("./assets/images/community (3).jpg")}
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
              {/* HERO SECTION - RIGHT   */}
              <div className="right">
                <h1 className="inline">re</h1>
                <div className="line"></div>
                <br />
                <h1>discover</h1>
                <h5>your community</h5>
                <p className="font-sm font-gray">
                  We are on a mission to make people love coming to work every
                  day. We do this by bolstering their spirits and by helping
                  them in any way we can, so they can shoot for the stars.
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
          </HomeSlider>
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
        {/* OUR COMMUNITY GALLERY REVEALER SECTION */}
        <section className="community-gallery-revealer-section module">
          <main className="community-gallery-revealer-wrapper">
            <p className="community-gallery-revealer-title">
              <h1>
                our
                <br />
                <span className="color-primary">community</span>
              </h1>
            </p>
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
              <div className="revealer-wrapper">
                {this.state.community.map((info, i) => {
                  return (
                    <div className="revealer-gray">
                      <img className="member-pic" src={info.images[0]} />

                      <div className="cm-head">
                        <h1 className="cm-name-heading">{info.memberName}</h1>
                        <p>{info.companyName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </section>
        {/* OUR PARTNERS SECTION */}
        <section>
          <main className="our-partners-main">
            <p className="our-partners-title">
              <h5 className="color-primary">OUR</h5>
              <h1>partners</h1>
            </p>
            {/*  RAINBOW DIVIDER  */}
            <div className="rainbow-divider start"></div>
            {/* CONTENT AREA */}
            {
              <marquee className="our-partners-content-area" scrollamount="12">
                <img
                  src={require("./assets/images/PartnerLogos/ATS.jpg")}
                  style={{ width: 200, height: 200 }}
                />
                <img
                  src={require("./assets/images/PartnerLogos/1-removebg-preview.jpg")}
                  style={{ width: 170, height: 130 }}
                />
                <img
                  src={require("./assets/images/PartnerLogos/cinepax.jpg")}
                  style={{ width: 240, height: 130 }}
                />
                <img
                  src={require("./assets/images/PartnerLogos/eighteen.jpg")}
                  style={{ width: 240, height: 110 }}
                />
                <img
                  src={require("./assets/images/PartnerLogos/icraft.jpg")}
                  style={{ width: 230, height: 100 }}
                />
                <img
                  src={require("./assets/images/PartnerLogos/village.jpg")}
                  style={{ width: 150, height: 150 }}
                />
              </marquee>
            }
            {/*  RAINBOW DIVIDER  */}
            <div className="rainbow-divider "></div>
          </main>
        </section>
        {/* Blogs Section */}
        <section className="colourfullboxes-section module">
          <p className="our-partners-title">
            <h5 className="color-primary">OUR</h5>
            <h1>blogs</h1>
          </p>
          <Blog />
        </section>
        {/*  COLOURFULL BOXES SECTION  */}

        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
