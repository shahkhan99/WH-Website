import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/styles/plans_page_slider.css";
import BookATourModal from "../../BookATourModal/index";
import { GetAllPlan } from "../../../Services/Admin-Service";

export var NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={require("./assets/images/right.png")}
      onClick={onClick}
      style={{ width: "50px", height: 50 }}
    />
  );
};

export var PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={require("./assets/images/left.png")}
      onClick={onClick}
      style={{ width: "50px", height: 50 }}
    />
  );
};

export class AminitiesSlider extends Component {
  renderCardContent = (title, subtitle, content, image) => {
    return (
      <div className="pp-slider-box-border-wrap">
        <div
          className={"pp-slide"}
          onMouseOver={(e) => {
            if (document.getElementById("pp-slide-mousein")) {
              document.getElementById("pp-slide-mousein").remove();
            }
            if (!document.getElementById("pp-slide-mousein")) {
              let p = document.createElement("p");
              p.setAttribute("class", "pp-slide-mousein");
              p.setAttribute("id", "pp-slide-mousein");
              p.innerHTML = content;
              e.currentTarget.appendChild(p);
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.removeChild(
              document.getElementById("pp-slide-mousein")
            );
          }}
        >
          <div className={"pp-slide-mouseout"} id={"pp-slide-mouseout"}>
            <img src={image} />
            <br />
            <p>
              {title} {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      className: "pp-slider",

      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },

        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { index, ...props } = this.props;
    return (
      <Slider {...settings}>
        {this.renderCardContent(
          `Parking`,
          ``,
          `We offer a safe parking space for your vehicle and security inside to assist with members’ parking. `,
          require("./assets/images/1. Parking.png")
        )}

        {this.renderCardContent(
          `High Speed Internet`,
          ``,
          `Our office space is equipped with high-speed internet with access to Wi-Fi and backup internet.`,
          require("./assets/images/2. High speed internet.png")
        )}

        {this.renderCardContent(
          `Weekend Access`,
          ``,
          `Your office space is accessible on the weekends.
          Access to member communities – Members will have physical and online access to our diverse community.
          `,
          require("./assets/images/3. Weekend Access-01.png")
        )}

        {this.renderCardContent(
          `Member Community`,
          ``,
          `At Work Hall, communities are fostered through creating uplifting environments where members and their work is understood and revered.          `,
          require("./assets/images/4. Member Community-01.png")
        )}

        {this.renderCardContent(
          `Meeting and Conference rooms.`,
          ``,
          `All plans include access to conference rooms. Reservations are to be made at least 2 hours in advance through our community managers or staff members.
          Phone booths, discussion spaces, and common areas - All members under all plans can access these on a first-come, first-served basis
          `,
          require("./assets/images/5. Meeting and conference rooms.png")
        )}

        {this.renderCardContent(
          `Flexible Timings`,
          ``,
          ` You can start your day fresh at 9 am and work throughout the day until 9 pm. You can speak with your community manager should you choose to work for longer hours. 
          `,
          require("./assets/images/6. Flexible Timings.png")
        )}

        {this.renderCardContent(
          `Security`,
          ``,
          `Work Hall sites offer security inside the building premises and assist with members' parking space..`,
          require("./assets/images/7. Security-01-01.png")
        )}

        {this.renderCardContent(
          `Shared Printers`,
          ``,
          `Our community members get access to printers within our vicinity.`,
          require("./assets/images/8. Shared Printers.png")
        )}

        {this.renderCardContent(
          `Common Area`,
          ``,
          `Work Hall ensures that our community members don’t spend the entire day stuck to their desks, offering them a common area to unwind.`,
          require("./assets/images/9. Common Area.png")
        )}

        {this.renderCardContent(
          `Specialized Manager`,
          ``,
          `Work Hall community managers and staff members are usually onsite at each location between 9 am – 6 pm local time, Monday through Friday.`,
          require("./assets/images/10. Specialized Managers.png")
        )}

        {this.renderCardContent(
          `Complimentary Brewed Tea`,
          ``,
          `We offer free and unlimited tea, coffee, iced latte from our serviced coffee bar.`,
          require("./assets/images/11. Complimentary Brewed Tea.png")
        )}

        {this.renderCardContent(
          `Dining Area and Kitchenette`,
          ``,
          `Members can use our shared dining room and kitchenette for lunchtime. `,
          require("./assets/images/12. Dining Area and Kitchenette-01.png")
        )}

        {this.renderCardContent(
          `Regular Maintainance`,
          ``,
          `We take cleanliness and hygiene very seriously, and ensure that the office space is spick and span. `,
          require("./assets/images/13. Regular Maintainance-01-01.png")
        )}

        {this.renderCardContent(
          `Air Conditioning`,
          ``,
          `Our office spaces are equipped with HVACs and power backups for our community's convenience.`,
          require("./assets/images/14. Air conditioning-01.png")
        )}

        {this.renderCardContent(
          `Furniture`,
          ``,
          `
          All offices include ergonomic desks and chairs. X plans and Boxes usually include lockable drawers and additional storage space.`,
          require("./assets/images/15. Furniture-01-01-01.png")
        )}
        {this.renderCardContent(
          `Locker Rooms`,
          ``,
          `Locker rooms are available on a monthly subscription, subject to availability `,
          require("./assets/images/16. Locker Rooms-01.png")
        )}
        {this.renderCardContent(
          `Mail and Parcel Handling`,
          ``,
          `
          Our staff ensures that your incoming packages reach your office/point of contact safely.`,
          require("./assets/images/17. Mail and parcel handling.png")
        )}
        {this.renderCardContent(
          `Backup Power`,
          ``,
          `Our office spaces are equipped with backup power for our community’s convenience`,
          require("./assets/images/18. Backup Power-01.png")
        )}
      </Slider>
    );
  }
}

export class PlansSlider extends Component {
  constructor() {
    super();
    this.state = {
      selectedLocation: "",
      bookATour: false,
      plans: [],
    };
  }
  renderPlans = () => {
    let { type } = this.props;

    return this.state.plans
      .filter((plan, i) => {
        return plan.locName == type;
      })
      .map((plan, i) => {
        return (
          <div
            className={`card-background-div ${
              i == 1 || i == 3 || i == 5 || i == 7 ? "even" : ""
            }`}
          >
            <div className="card-outer-div">
              <div className="slide-card-img-div">
                <img
                  src={plan.images[0]}
                  className={"slide-card-img"}
                  style={{ width: `${"100%"}`, height: "190px" }}
                />
              </div>
              <div className={"slide-card-content-div"}>
                <p className="slide-card-location">{plan.planName}</p>
                <div className="slide-card-description">
                  <p>{plan.planInfo}</p>
                </div>
                <p className="slide-card-bestfor">Best for:</p>
                <div className="best-for-items">
                  <ul className="plan-list-container">
                    {plan.bestFor.map((name, i) => {
                      return <li className="plan-list">{name}</li>;
                    })}
                  </ul>
                </div>

                <button
                  className="button primary"
                  onClick={() => {
                    this.setState({ bookATour: !this.state.bookATour });
                  }}
                  style={{ width: "70%", padding: 5, borderStyle: "none" }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        );
      });
  };

  FetchPlan = () => {
    GetAllPlan("all").then((docs) => {
      this.setState({ plans: docs, selectedLocation: docs[0].locName });
      console.log(docs);
    });
  };
  componentDidMount() {
    this.FetchPlan();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      // beforeChange:(oldind,newind)=>this.changeSlide(oldind,newind),
      // useCSS:false,
      slidesToScroll: 1,
      arrows: true,
      // centerMode:true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 4000,
      className: "pp-slider",
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },

        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { index, ...props } = this.props;

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

        <Slider {...settings} className="pp-slider ">
          {this.renderPlans()}
        </Slider>
      </>
    );
  }
}
