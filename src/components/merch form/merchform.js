import React, { Component } from "react";
import "./style.css";
import { Overlay } from "react-portal-overlay";
import { data, event } from "jquery";
import { formupdate } from "../../Services/Admin-Service";
import swal from "sweetalert";
import * as emailjs from "emailjs-com";

export default class Merchform extends Component {
  state = {
    show: false,

    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    country: "",
    province: "",
    quantity: 1,
    price: null,
    name: "",
    shipmentPrice: "",
    city: "",
  };

  formdetails = (price,tableName) => {
    const {
      // price,
      // name,
      email,
      firstName,
      lastName,
      mobileNumber,
      address,
      country,
      province,
      quantity,
      shipmentPrice,
      city,
    } = this.state;
 const totalPrice= price+shipmentPrice
    const detail = {
      price,
      email,
      firstName,
      lastName,
      mobileNumber,
      address,
      country,
      province,
      quantity,
      shipmentPrice,
      city,
      tableName,
      totalPrice
    };
    console.log(detail);
    if (
      !tableName ||
      !email ||
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !address ||
      !country ||
      !province ||
      !price ||
      !shipmentPrice ||
      !city ||
      !quantity
    ) {
      swal("Please make sure you have filled all fields");
    } else {
      formupdate({ data:detail }).then((id) => {
      // e.preventDefault();
      
    detail.orderID = id

      emailjs
        .send(
          "service_0o32nkd",
          "template_13e6ffa",
          detail,
          "user_AMdLkQAzKg8l9t02AVlpH"
        )
        .then(
          (result) => {
            swal({
              title: "your Order have been  submitted",
              icon: "success"
            }).then(()=>
              window.location.reload()
            )
            console.log(result.text);
          },
          (error) => {
            
            console.log(error.text);
          }
        );
      });
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ ...this.state, show: false });
  };
  onformhandler = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };
  onSelectChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      city: e.target.value.split(",")[0],
      shipmentPrice: parseInt(e.target.value.split(",")[1]),
    });
  };
  increment = () => {
    var quantity = this.state.quantity;
    quantity = quantity + 1;
    this.setState({ quantity: quantity });
  };
  total;
  decrement = () => {
    var quantity = this.state.quantity;
    quantity = quantity - 1;
    this.setState({ quantity: quantity });
  };

  render() {
    console.log(" aaaaaaa", this.state.city);
    const { open, close, product } = this.props;
    console.log(product);

    return (
      <Overlay
        // class="overlycls"
        // style={{ height: "50%", width: "50%" }}
        className="modal-background"
        open={this.props.open}
        onClose={this.props.close}
      >
        {product.map((data, i) => (
          <div className="modal-gradient-background-2" >
            
            <div className="space">
              <img
                onClick={close}
                src={require("./assets/images/close.png")}
                style={{ height: "20px", width: "20px",cursor: 'pointer' }}
              />
            </div>
            
            <div className="main-modal" >
              <div className="form">
                <div className="detaildiv">Your Details</div>
                <div className="line1"></div>

                <div class="inp2-main">
                  <div class="inp2">
                    <p>Email</p>
                    <input
                      className="input-all"
                      name="name"
                      type="email"
                      id="email"
                      onChange={this.onformhandler}
                    />
                  </div>
                  <div class="inp2">
                    <p>First Name</p>
                    <input
                      className="input-all"
                      name="name"
                      type="text"
                      id="firstName"
                      onChange={this.onformhandler}
                    />
                  </div>
                </div>
                <div class="inp3-main">
                  <div class="inp3">
                    <p>Last Name</p>
                    <input
                      className="input-all"
                      name="name"
                      type="text"
                      id="lastName"
                      onChange={this.onformhandler}
                    />
                  </div>
                  <div class="inp3">
                    <p>Mobile </p>
                    <input
                      className="input-all"
                      name="name"
                      type="text"
                      id="mobileNumber"
                      onChange={this.onformhandler}
                    />
                  </div>
                </div>
              </div>
              <div className="form2">
                <div className="detaildiv">shipping details</div>
                <div className="line1"></div>

                <div class="inp5-main">
                  <div class="inp5">
                    <p>Address </p>
                    <input
                      className="input-all"
                      name="address"
                      type="text"
                      id="address"
                      onChange={this.onformhandler}
                    />
                  </div>
                  <div class="inp5">
                    <p>Country</p>
                    <input
                      className="input-all"
                      name="name"
                      type="text"
                      id="country"
                      onChange={this.onformhandler}
                    />
                  </div>
                </div>
                <div class="inp6-main">
                  <div class="inp6">
                    <p>Province</p>
                    <select
                      className="input-all"
                      name="name"
                      type="text"
                      id="province"
                      onChange={this.onformhandler}
                    >
                      <option value="" disabled selected hidden></option>
                      <option>Sindh</option>
                      <option>Punjab</option>
                      <option>Balochistan</option>
                      <option>KPK</option>
                    </select>
                  </div>
                  <div class="inp6">
                    <p>City</p>
                    <select
                      className="input-all"
                      name="name"
                      type="text"
                      id="city"
                      onChange={this.onSelectChange}
                    >
                      <option value="" disabled selected hidden>
                        Select City
                      </option>

                      <option value="karachi,1500">Karachi</option>

                      <option value="Lahore,2800">Lahore</option>

                      <option value="Islamabad,2800">Islamabad</option>

                      <option value="Peshawar,2800">Peshawar</option>
                      <option value="Quetta,2800">Quetta</option>
                    </select>
                  </div>
                  
                </div>
              
               
              </div>
              <div className="form3">
                <div className="detaildiv">Payment Method</div>
                <div className="line1"></div>
                <li> Cash on Delivery</li>
              </div>
            </div>
            <div className="main-review">
              <div class="review-sec">
                <div class="form-main">
                  <div class="orerform">Order Summary</div>
                  <div className="line2"></div>
                  <div class="subtotal">
                    <div className="sub-main">
                      <p className="p-sub">Subtotal:</p>
                      <p className="p-price">
                        {" "}
                        {data.price
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </p>
                    </div>
                    <div className="sub-main">
                      <p className="p-ship">Shipping </p>

                      <p className="p-price"> {this.state.shipmentPrice}</p>
                    </div>
                  </div>

                  <div className="line2"></div>

                  <div class="Item-main">
                    <div class="total-PKR">
                      <p class="total">ORDER TOTAL</p>
                      <p class="PKR">
                        PKR:
                        {new Intl.NumberFormat("en-IN").format(
                          data.price * this.state.quantity +
                            this.state.shipmentPrice
                        )}
                      </p>
                    </div>
                    <div className="container-btns">
                      <a
                        className="button-counter"
                        onClick={
                          this.state.quantity == 1 ? "" : () => this.decrement()
                        }
                      >
                        -
                      </a>
                      <p className="h2-btn">{this.state.quantity} </p>
                      <a
                        className="button-counter"
                        onClick={() => this.increment()}
                      >
                        +
                      </a>
                    </div>
                  </div>

                  <div className="line2"></div>
                  <div class="sec-3">
                    <div class="img-div">
                      <img className="image-div" src={data.image[1]}></img>
                    </div>
                    <div class="table-del">
                      <div>{data.name}</div>
                      <div>Qty : {this.state.quantity}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec-4">
                <div class="shipto">Ship To :</div>
                <div className="line3"></div>
                <div class="adress">
                  {this.state.address + "  "}

                  {this.state.city + "  "}

                  {this.state.country}
                </div>
                <div className="line3"></div>
                <div class="button-div">
                    <div
                  class="checkout"
                  onClick={() => this.formdetails(data.price,data.name)}
                >
                  Checkout
                </div>
               
                </div>
              </div>
            </div>
            </div>
          
          
        ))}
      </Overlay>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};
