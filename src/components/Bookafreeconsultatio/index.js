import React, { Component } from "react";
import emailjs from "emailjs-com";
import "./assets/styles/bookingconsultation.css";
import { Overlay } from "react-portal-overlay";

export default class BookATourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      companyName: "",
      services: "",
      phone: "",
      email: "",
    };
  }

  _handleChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };

  _formatAMPM(hours, minutes) {
    var hours = hours;
    var minutes = minutes;
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    alert(strTime);
    return strTime;
  }

  bookATour = (e) => {
    let { name, companyName, services, phone, email } = this.state;
    console.log(services);
    if (!name || !companyName || !services || !email || !phone) {
      alert(
        "please make sure you have provided  name, Companyname, Ourservices, email, Phone,"
      );
    } else {
      //  console.log(name,location,plan,phone,email,date,time)
      // let splittedTime = time.split(':')
      // time = this._formatAMPM(splittedTime[0], splittedTime[1].charAt(1))
      // let userInfo = { name, location, plan, phone, email, date, time }
      e.preventDefault();
      emailjs
        .sendForm(
          "service_lxcc9eg",
          "template_6oa0lgf",
          e.target,
          "user_Ajy3NqhleDn5JGCEsBM7r"
        )
        .then((success) => {
          Promise.all([alert("You have booked a free consultaion.")]).then(
            this.props.close
          );
        });
    }
  };
  resetForm = () => {
    this.setState({
      name: "",
      companyName: "",
      services: "",
      phone: "",
      email: "",
    });
  };
  render() {
    return (
      <Overlay
        className="modal-background-cfo"
        open={this.props.open}
        onClose={this.props.close}
      >
        <div className="modal-gradient-background-cfo">
          <div className="modal-div-cfo">
            <div onClick={this.props.close} className="close-btn">
              <img
                src={require("./assets/images/close.png")}
                style={{ height: "15px", width: "15px" }}
              />
            </div>
            <div className="modal-head-cfo">
              <p>Register with us</p>
            </div>
            <form className="my-modal-content-cfo" onSubmit={this.bookATour}>
              <div class="modalr2-cfo">
                <p>My name is</p>
                <input
                  name="name"
                  onChange={(name) => {
                    this._handleChange("name", name.target.value);
                  }}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div class="modalr3-cfo">
                <div class="modalr4-cfo">
                  <p>I can be reached at </p>
                  <div>
                    <input
                      name="phone"
                      onChange={(phone) => {
                        this._handleChange("phone", phone.target.value);
                      }}
                      type="text"
                      placeholder="Phone"
                    />
                    <input
                      name="email"
                      onChange={(email) => {
                        this._handleChange("email", email.target.value);
                      }}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="modalr8-cfo">
                  <p>My company’s name is</p>
                  <input
                    style={{ width: "330px" }}
                    name="companyName"
                    onChange={(companyName) => {
                      this._handleChange(
                        "companyName",
                        companyName.target.value
                      );
                    }}
                    type="text"
                    placeholder="Company’s Name"
                  />
                </div>
                <p>I’d be interested in </p>
                <div>
                  <select
                    name="services"
                    onChange={(services) => {
                      this._handleChange("services", services.target.value);
                    }}
                    id="Services"
                  >
                    <option value="" disabled selected hidden>
                      Our services
                    </option>
                    <option value="Preparation of financial statements using IFRS">
                      Preparation of financial statements using IFRS
                    </option>
                    <option value="Tailor-made management reports">
                      Tailor-made management reports
                    </option>
                    <option value="Inventory management and reporting">
                      Inventory management and reporting
                    </option>
                    <option value="Preparation of tax returns and reports">
                      Preparation of tax returns and reports
                    </option>
                    <option value="Company registration, formation, updation and liquidation">
                      Company registration, formation, updation and liquidation
                    </option>
                    <option value="others">others</option>
                  </select>
                </div>
              </div>

              <div class="modalr6-cfo">
                <p>
                  <input type="checkbox" id="test1" />
                  <label for="test1">
                    I would like Work Hall to send me more great offers and
                    communications. Please see our privacy policy for how we
                    store and use your personal information.
                  </label>
                </p>
              </div>
              <div class="modalr7-cfo">
                <button type="submit" class="gradient-btn-cfo">
                  Submit
                </button>
                {/* <button style={{height:50,}} onClick={this.props.close}>cancel</button> */}
              </div>
            </form>
          </div>
        </div>
      </Overlay>
    );
  }
}
