import React, { Component } from "react";
import "./assets/styles/enrollnow_page.css";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";

// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";
import { GetOneProduct } from "../../Services/Admin-Service";
import AcademyRegister from "../../components/AcademyRegister/index";

import e1 from "./assets/images/header/Ellipse 19.png";
import f1 from "./assets/images/header/Frame (1).png";
import e2 from "./assets/images/header/Ellipse 20.png";
import f2 from "./assets/images/header/Frame (2).png";
import { Link, animateScroll as scroll } from "react-scroll";

export default class EnrollNowPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      bookATour: false,
      sideDrawerOpen: false,
      course: [],
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

  FetchCourse = () => {
    let a = [];

    const { id } = this.props.match.params;
    GetOneProduct({ id }).then((data) => {
      a.push(data);
      this.setState({ course: a });
    });
  };

  componentDidMount() {
    this.FetchCourse();
  }

  render() {
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        {console.log(
          this.state.course.map((l) => {
            console.log(l.price);
          })
        )}

        {/* NAV SECTION */}
        <Nav
          activeScreen="Academy"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {/* Image Slider */}
        {this.state.course.map((list, i) => {
          return (
            <div>
              <div className="background-color">
                <section className="container">
                  <div className="row align-items-center vertical-height flx-box">
                    <div
                      className="col-md-12 col-lg-5 col-sm-12 col-11 order-sm-2 order-lg-1
              order-md-2 header-container"
                    >
                      <h1 className="cr-h ">{list.long_name}</h1>
                      <p>{list.short_description}</p>
                      <button type="button" class="e-btn">
                        <Link
                          activeClass="active"
                          to="register-form"
                          spy={true}
                          smooth={true}
                          offset={-30}
                          duration={500}
                        >
                          Enroll Now
                        </Link>
                      </button>
                    </div>
                    <div className="col-md-12 col-lg-6 col-sm-12 order-sm-1 col-11 order-lg-2 order-md-1 image-container ">
                      <div className="back-images">
                        <img src={e1} className="img-width"></img>

                        <img src={f1} className="img-width margin"></img>
                        <div className="img-big-width">
                          <img src={list.images[0]} className="myimg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <section className="program-details">
                <div className="content-headings">
                  <h2 className="head1">
                    <Link
                      id="anchor-tag"
                      activeClass="active"
                      to="video-content-content"
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                    >
                      Program Details
                    </Link>
                  </h2>
                  <div className="vertical-divider divider-margin"></div>
                  <h2 className="head2">
                    <Link
                      id="anchor-tag2"
                      activeClass="active"
                      to="course-summary-container"
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                    >
                      Course Details
                    </Link>
                  </h2>
                </div>

                <div className="detail">
                  <div className="detail-space">
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/1.png")}
                      />
                      <p className="detail-text">Start date: {list.s_date}</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/2.png")}
                      />

                      <p className="detail-text">
                        Course duration: {list.duration}
                      </p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/3.png")}
                      />

                      <p className="detail-text">
                        {list.no_sessions} live on-air sessions
                      </p>
                    </div>

                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/6.png")}
                      />
                      <p className="detail-text">
                        Course completion certificate
                      </p>
                    </div>
                  </div>
                  <div className="detail-space">
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/5.png")}
                      />

                      <p className="detail-text">Days: Sat & Sun</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/4.png")}
                      />

                      <p className="detail-text">Final project submission</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/7.png")}
                      />
                      <p className="detail-text">Weekly mock tests</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/8.png")}
                      />
                      <p className="detail-text">
                        Lifetime access to recorded sessions
                      </p>
                    </div>
                  </div>
                  <div className="detail-space">
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/9.png")}
                      />
                      <p className="detail-text">Session duration: 2hrs</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/10.png")}
                      />
                      <p className="detail-text">Urdu - English</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                          top: "-5px",
                        }}
                        src={require("./assets/images/icons/11.png")}
                      />
                      <p className="detail-text">Beginner to advanced</p>
                    </div>
                    <div className="points">
                      <img
                        style={{
                          height: "35px",
                          width: "25px",
                          marginRight: "5px",
                          top: "-20px",
                        }}
                        src={require("./assets/images/icons/12.png")}
                      />
                      <p className="detail-text">
                        Registration deadline: {list.r_deadline}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section id="video-content-content" className="video-content">
                <div className="container">
                  <div className="row align-items-center vertical-height">
                    <div className="col-md-6 col-lg-6 col-11 image-container ">
                      <div>
                        <iframe
                          className="video"
                          width="560"
                          height="315"
                          src={list.intro_link}
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                    <div className="col-md-5 col-lg-5 col-11">
                      <h1 className="vd-cn-head">Course Details</h1>
                      <p className="vd-cn-p">{list.long_description}</p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="video-content">
                <div className="container">
                  <div className="row align-items-center vertical-height flx-box">
                    <div className="col-md-5 col-lg-5 col-11 ">
                      <h1 className="vd-cn-head">Who is it for?</h1>
                      <p className="vd-cn-p">{list.forWho}</p>
                    </div>
                    <div className="col-md-6 col-lg-6 col-11 image-container  ">
                      <div className="back-third-images height image-container">
                        <img src={e2} className="back-third-first"></img>

                        <img src={f2} className="back-third-second"></img>
                        <div className="img-big">
                          <img
                            className="img-big-myimg myimg"
                            src={list.images[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="techer-section">
                <div className="container">
                  <div className="horizontal-divider"></div>
                  <div className="teacher-info">
                    <div className="teacher-image">
                      <img src={list.images[2]}></img>
                      <a href={list.t_linkedin}>
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                    <div className=" teacher-details">
                      <h2>{list.tutorname}</h2>
                      <div className="teacher-qualificaiton">
                        <p>{list.t_qualification}</p>
                      </div>
                      <p>{list.t_details}</p>
                    </div>
                  </div>
                  <div className="horizontal-divider"></div>
                </div>
              </section>

              <section id="course-summary-container" className="course-summary">
                <div className="cr-sm">
                  <div className="cr-sm-topheading">
                    <h2>Course summary</h2>
                    <h1>What you will learn</h1>
                  </div>
                  {list.productVariant.map((sum, i) => {
                    return (
                      <div className="cr-sm-paragraph">
                        <div className="para-head">
                          <h1 className="para-head-h1">Week {i + 1}</h1>
                        </div>
                        <div className="divider-p">
                          <div className="vertical-divider-paragraph"></div>
                          <div className="radius"></div>
                        </div>

                        <div className="cr-sm-side-content">
                          <h1>{sum.name}</h1>
                          {sum.Options.map((op, ind) => {
                            return (
                              <li className="cr-sm-side-content-p">
                                {op.content}
                              </li>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <AcademyRegister />

              {/*  RAINBOW DIVIDER  */}
              <div className="rainbow-divider module"></div>
              {/* FOOTER SECTION */}
              <Footer />
            </div>
          );
        })}
      </div>
    );
  }
}
