import React, { Component } from "react";
import "./assets/styles/academy_page.css";
import ReactCardFlip from "react-card-flip";
import $ from "jquery";

//Nav
import Nav from "../../components/Nav/index";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";

//Footer
import Footer from "../../components/Footer/index";
// Slider
import { AcademyHeader } from "../../components/AcademyHeader/index";
// Book A Tour Modal
import BookATourModal from "../../components/BookATourModal/index";
import { AcademySlider } from "../../components/Slider/AcademyPage-Slider/index";
import AcademyRegister from "../../components/AcademyRegister/index";

export default class AcademyPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isFlipped1: false,
      isFlipped2: false,
      isFlipped3: false,
      isFlipped4: false,
      isFlipped5: false,
      isFlipped6: false,
      isFlipped7: false,
      isFlipped8: false,
      isFlipped9: false,
      isFlipped10: false,
      isFlipped11: false,
      isFlipped12: false,
      isFlipped13: false,
      isFlipped14: false,
      isFlipped15: false,
      bookATour: false,
      collapseID: "",
      sideDrawerOpen: false,
      cardDetails: [
        {
          title: "Live on-air sessions",
          description:
            "Students can fully grasp knowledge and interact with the entire class.",
          image: require("./assets/images/icons/Live on-air sessions.png"),
        },
        {
          title: "Limited students per batch",
          description: "Designed for maximum focus and one-on-one attention.",
          image: require("./assets/images/icons/Limited students per batch.png"),
        },
        {
          title: "Economical and affordable",
          description:
            "Our program fees are easy on the pockets that won’t take up a month of your pocket-money",
          image: require("./assets/images/icons/Economical and affordable.png"),
        },
        {
          title: "Recorded lectures",
          description:
            "Re-watch lectures on your own time if you miss a session.",
          image: require("./assets/images/icons/Recorded lectures.png"),
        },
        {
          title: "Expert tutors with practical knowledge",
          description:
            "Our tutors are experienced professionals who are experts in their field.",
          image: require("./assets/images/icons/Expert tutors with practical knowledge.png"),
        },
        {
          title: "Curated course outlines and modules",
          description:
            "You will know beforehand what you will be learning each week.",
          image: require("./assets/images/icons/Curated course outlines and modules.png"),
        },
        {
          title: "Mandatory mock tests and quizzes",
          description:
            "We emphasize on regular tests and quizzes for effective learning.",
          image: require("./assets/images/icons/Mandatory mock tests and quizzes.png"),
        },
        {
          title: "Work Hall branded certificates of completion",
          description:
            "You will receive certificates after submission of final projects.",
          image: require("./assets/images/icons/Work Hall branded certificates of completion.png"),
        },
        {
          title: "Physical access to Work Hall meeting rooms",
          description:
            "Access to one-on-one sessions with tutors for up to 2 months after course completion.",
          image: require("./assets/images/icons/Physical access to Work Hall meeting rooms.png"),
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

  componentDidMount() {
    //    window.safepay.Button.render({
    //      // Choose between "production" or "sandbox"
    //      env: 'sandbox',
    //      // The amount you wish you charge
    //      amount: 6800.57,
    //      // The currency of the purchase
    //      currency: "PKR",
    //      // Your API Keys
    //      client: {
    //        "sandbox": "sec_aeef1a13-1c58-4096-a5ce-9c0b3893302f"
    //      },
    //      customer: {
    //       first_name: "Ziyad",
    //       last_name: "Parekh",
    //       email: "ziyad@gmail.com",
    //       phone: "03008287540"
    //     },
    //     billing: {
    //       "name": "Default Address",
    //       "address_1": "12/1 7th South Street DHA Phase 2",
    //       "address_2": "",
    //       "city": "Karachi",
    //       "province": "Sindh",
    //       "postal": "75500",
    //       "country": "PK"
    //     },
    //      payment: function (data, actions) {
    //        return actions.payment.create({
    //          transaction: {
    //            amount: 6800.57,
    //            currency: 'PKR'
    //          }
    //        })
    //      },
    //      onCheckout: function(data, actions) {
    //        console.log(data)
    //        console.log("You completed the payment!");
    //      },
    //      onCancel: function (data, actions) {
    //        // The buyer cancelled the payment
    //        // Don't create an order in your system
    //      },
    //  }, '#safepay-button-container');
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
          page="RML-purple"
          activeScreen="Academy"
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <section className="a-hero module">
          <AcademyHeader />
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
        {/* Welcome Div */}
        {/* Course Slider */}

        <section className="a-sliderr">
          <AcademySlider />
        </section>

        <section className="welcome-section module">
          <div className="wrapper mini">
            <div className="top-area">
              <div className="title-area">
                <h3>The Community of the Creative Class</h3>
                <h5>
                  <span className={"span-red"}>-</span>
                </h5>
                <h1 className="font">How we started Work Hall Academy?</h1>
              </div>
              <div className=" img-area1">
                <img src={require("./assets/images/welcome image.jpg")}></img>
              </div>
            </div>

            <div className="content-area font-lg">
              <p>
                Work Hall has been known to build unique experiences for our
                members, be it a high-powered office space or a meaningful
                interaction with our community of hundreds of entrepreneurs and
                businesses.
              </p>

              <p>
                Being around all kinds of businesses helped us realize that
                finding the right talent was a chronic pain because of a
                skill-to-market misfit. The answer to this problem was simple -
                a skill-based education system to survive the new economy.
              </p>

              <p>
                And so, the Work Hall Academy was born out of necessity to
                democratize education and fix the broken system by empowering
                creators of today with relevant and up-to-date online courses on
                the most recent technologies, softwares and programs.
              </p>
              <p>
                We think that the future of education is digital and since the
                current generation was brought up with the Internet, they are
                prepared for that change. Access to our network was limited
                exclusively to our members and there was no way that an outsider
                without an office space could join the Work Hall movement. Now
                they can!
              </p>
            </div>
          </div>
        </section>

        {/* Welcome Div */}
        {/* Learn section */}
        <section className="learn-section">
          <div className="l-content-div">
            <div className="learn-content">
              <h1 className="learn-heading">Why WorkHall Academy?</h1>
              <br />
              <p>
                Access the best live online courses for creatives. Interact with
                the best professionals and discover all the secrets of the
                sector.
              </p>
            </div>
          </div>
          <div className="cards">
            <div className="card-align">
              {this.state.cardDetails.map((cards, i) => {
                return (
                  <div className="card">
                    <img src={cards.image} height="130px" width="130px" />
                    <h3>{cards.title}</h3>
                    {/* <p>{cards.description}</p> */}
                  </div>
                );
              })}
            </div>
          </div>
          <AcademyRegister />
        </section>

        {/* Learn section */}

        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
