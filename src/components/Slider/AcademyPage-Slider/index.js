import React, { Component } from "react";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetAllProducts } from "../../../Services/Admin-Service";

import {
  faCoffee,
  faAngleRight,
  faCode,
  faMicrophoneAlt,
  faDesktop,
  faHourglassHalf,
  faCalendar,
  faChartPie,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faWordpress } from "@fortawesome/free-brands-svg-icons";
import FontAwesome from "react-fontawesome";
import Loader from "react-loader-spinner";

// CSS
import "./assets/styles/academy_page_slider.css";
import { Link, animateScroll as scroll } from "react-scroll";

export class AcademySlider extends Component {
  constructor() {
    super();
    this.state = {
      courseNumber: null,
      bookATour: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.FetchProducts();
  }

  FetchProducts = () => {
    GetAllProducts("all").then((docs) => {
      this.setState({
        products: docs,
        courseNumber: docs[0].id,
        loader: false,
      });
    });
  };
  render() {
    const { path, url } = this.props;
    const { products } = this.state;
    return (
      <>
        {this.state.loader ? (
          <div className="revealer-wrapper-load">
            <Loader
              type="BallTriangle"
              secondaryColor="green"
              color="#654ea3"
              height={100}
              width={100}
              // timeout={3000}
            />
          </div>
        ) : (
          <div className="ap-course-background" id="ac-slider">
            <div className="ap-courses-div" id="style-1">
              <div className="a-qoate">
                <img src={require("./assets/images/Quote Mark (1).png")} />
                <h1 className="ap-course-heading">Learn by participating</h1>
                <div>
                  <p>
                    Access the best online courses in Pakistan for creatives and
                    tech taught by our experts. Learn with experienced tutors
                    and become Work Hall certified.
                  </p>
                </div>
              </div>

              <div className="ap-c-list-div" id="style-1">
                {products &&
                  products.map((list, i) => {
                    return (
                      <div
                        className="ap-courses-list"
                        onClick={() => {
                          this.setState({ courseNumber: list.id });

                          document
                            .getElementById("course-d")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <div className="course-icons-left">
                          <i className={`icon-col-size ${list.icons}`} />
                          {/* <FontAwesomeIcon icon={list.icons} className="icon-col-size" size="2x" /> */}
                        </div>
                        <div className="ap-c-l">
                          <h1 className="ap-c-list-name"> {list.short_name}</h1>
                        </div>
                        <div className="course-arrow-right">
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="icon-col-size"
                            size="lg"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="ap-course-details-bg" id="course-d">
              {products &&
                products.map((no, i) => {
                  if (this.state.courseNumber == no.id) {
                    return (
                      <div>
                        <div className="as-header">
                          <div className="heading-class">
                            <h2 className="c-heading">{no.long_name}</h2>
                          </div>
                          <div className="c-logo">
                            <img
                              src={require("./assets/images/finalized logo.png")}
                              style={{ height: "50px", width: "135px" }}
                            />
                          </div>
                        </div>
                        <div className="c-details" id="style-1">
                          <div className="card-price">
                            <div>
                              <p className="c-price">
                                PKR{" "}
                                {new Intl.NumberFormat("en-IN").format(
                                  no.price
                                )}
                              </p>
                            </div>
                            <div className="c-divider"></div>
                          </div>
                          <div className="c-text">
                            <p>{no.short_description}</p>
                          </div>

                          <div className="c-points">
                            <div className="p-align">
                              <div className="a-points">
                                <FontAwesomeIcon
                                  icon={faDesktop}
                                  color="#9400D3"
                                  size="2x"
                                />

                                <div>
                                  <p style={{ fontWeight: "900" }}>
                                    Course Start Date
                                  </p>
                                  <p>
                                    {new Intl.DateTimeFormat("en-GB", {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                    }).format(new Date(no.s_date))}
                                  </p>
                                </div>
                              </div>
                              <div className="a-points">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  color="#9400D3"
                                  size="2x"
                                />
                                <div style={{ marginLeft: "5px" }}>
                                  <p style={{ fontWeight: "900" }}>
                                    Course Duration
                                  </p>
                                  <p>{no.duration} Weeks</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-align">
                              <div className="a-points">
                                <FontAwesomeIcon
                                  icon={faHourglassHalf}
                                  color="#9400D3"
                                  size="2x"
                                />
                                <div style={{ marginLeft: "10px" }}>
                                  <p style={{ fontWeight: "900" }}>
                                    Registration Deadline
                                  </p>
                                  <p>
                                    {new Intl.DateTimeFormat("en-GB", {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                    }).format(new Date(no.r_deadline))}
                                  </p>
                                </div>
                              </div>
                              <div className="a-points">
                                <FontAwesomeIcon
                                  icon={faChartPie}
                                  color="#9400D3"
                                  size="2x"
                                />
                                <div>
                                  <p style={{ fontWeight: "900" }}>
                                    Students Enrolled
                                  </p>
                                  <p>{no.no_students}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="c-btn-rev">
                            <div>
                              <Link
                                // activeClass="active"
                                to="register-form"
                                // spy={true}
                                smooth={true}
                                offset={-30}
                                duration={500}
                              >
                                <div class="c-btn">Enroll Now</div>
                              </Link>
                            </div>

                            <div className="c-review">
                              <div
                                class="c-btn mi-btn"
                                onClick={() =>
                                  window.open(`/academy/${no.id}`, "_self")
                                }
                              >
                                Course Detail
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </>
    );
  }
}
