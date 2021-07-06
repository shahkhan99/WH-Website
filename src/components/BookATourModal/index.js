import React, { Component } from "react";
import emailjs from "emailjs-com";
import "./assets/styles/booking.css";
import { Overlay } from "react-portal-overlay";

export default class BookATourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      plan: "",
      phone: "",
      email: "",
      date: "",
      time: "",
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
    let { name, location, plan, phone, email, date, time } = this.state;
    if (!name || !location || !plan || !email || !date || !time || !phone) {
      alert(
        "please make sure you have provided  name, location, plan, email, date, time"
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
          "template_k2ctr59",
          e.target,
          "user_Ajy3NqhleDn5JGCEsBM7r"
        )
        .then((success) => {
          Promise.all([alert("Your tour has been booked")]).then(
            this.props.close
          );
        });
    }
  };
  resetForm = () => {
    this.setState({
      name: "",
      location: "",
      plan: "",
      phone: "",
      email: "",
      date: "",
      time: "",
    });
  };
  render() {
    return (
      <Overlay
        className="modal-background"
        open={this.props.open}
        onClose={this.props.close}
      >
        <div className="modal-gradient-background">
          <div className="modal-div">
            <div onClick={this.props.close} className="close-btn">
              <img
                src={require("./assets/images/close.png")}
                style={{ height: "15px", width: "15px" }}
              />
            </div>
            <div className="modal-head">
              <p>Come & see us</p>
            </div>
            <form className="my-modal-content" onSubmit={this.bookATour}>
              <div class="modalr2">
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
              <div class="modalr3">
                <p>I am looking for an office space at Work Hall</p>
                <div>
                  <select
                    name="location"
                    onChange={(location) => {
                      this._handleChange("location", location.target.value);
                    }}
                    id="Locations"
                  >
                    <option value="" disabled selected hidden>
                      Locations
                    </option>
                    <option value="Metropole">Metropole</option>
                    <option value="Pechs">Pechs</option>
                    <option value="Pechs">Ittehad</option>
                  </select>
                  <select
                    name="plan"
                    onChange={(plan) => {
                      this._handleChange("plan", plan.target.value);
                    }}
                    id="Plans"
                  >
                    <option value="" disabled selected hidden>
                      Plans
                    </option>
                    <option value="Air">Air</option>
                    <option value="X">X</option>
                    <option value="Box">Box</option>
                    <option value="Virtual Office">Virtual Office</option>
                    <option value="After Hours">After Hours</option>
                    <option value="Weekend Only">Weekend Only</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Custom Fitouts">Custom Fitouts</option>
                  </select>
                </div>
                <div class="modalr4">
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
              </div>
              <div class="modalr5">
                <p>I'd like to visit the site </p>
                <div>
                  <input
                    type="date"
                    name="date"
                    placeholder="choose date"
                    onChange={(date) => {
                      this.setState({ date: date.target.value });
                    }}
                  />
                  <input
                    name="time"
                    onBlur={(time) => {
                      this.setState({ time: time.target.value });
                    }}
                    type="time"
                    placeholder="choose time"
                  />
                </div>
              </div>
              <div class="modalr6">
                <p>
                  <input type="checkbox" id="test1" />
                  <label for="test1">
                    I would like Work Hall to send me more great offers and
                    communications. Please see our privacy policy for how we
                    store and use your personal information.
                  </label>
                </p>
              </div>
              <div class="modalr7">
                <button type="submit" class="gradient-btn">
                  book my tour
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
