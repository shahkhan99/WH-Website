import React, { Component } from "react";
import ReactPixel from "react-facebook-pixel";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

// CSS
import "./style.css";
import { GoogleSpreadsheet } from "google-spreadsheet";
const SPREADSHEET_ID = "18CO2tgpl9EZlNxgfQuQ8tpOaSBvAj_ydd910-YNuSp4";
const SHEET_ID = "0";
const CLIENT_EMAIL =
  "work-hall@academy-registra-1605173971230.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEHOlVYVGJOeB+\ntTj0W505Wntj4CxLpFxEWgBPhjZLL5y+qmcSbvzotqTm+U7Gsdbwb6VdtfO9lVVI\n1YdBkL8DfWOJfkGoOiyrKJH4Td7xgJ441cLF2dQ7VtxRSAlJjqwJ4+oeOakpxET0\nHhEu0KkrozOX73QOD65ycyQAnxGOMOgh6XQpayfYzh5svBiAfDmLa5+sLMSscgiw\nfGAiAOehRtF7zTpXbOp474NWIZKfkM081gS+/D0znj50XSkKFHmtC9o7bK5YXlfI\ntjy3vt41BQsyHiSoZ8HEp/nVUbHVTUA+yUAmqnNRrHFETZYSrMD67aal2Ivk4LHM\nKzN5TmUJAgMBAAECggEACOPiTFF3qQUeO8LlhKb04Gaikn3qfCOvXsDcDpQquMCn\n4M59ktdvBcdRKpBRhXkxNsqU4EPmkKj+Sf7gsrSdWCA9HNHup4c67ae5QEdFbJoU\nR3F3SCajs+ya2wttMlqySqt8j5IKbLSInK69QCug3kkicQg08Qs9xlNDu0x6twDv\ntSL1eAYRGtGHSHulELh5ZRsNzlsWwCiKTuU8/5XeT9K9vJXNu7J02KA5W46VDWOF\nUTK9GdbukE7g5xiCvi2jHpCWC9ZxqdCzd46/DJ5pwY4slJra1IFfhozmzQl6Lcso\noRF94XV93zJgK3QVwSzfjk2ugxXGnDG3B+wrb4a/NQKBgQDvTJnebjWYWm3ejb24\nImblIkpr0YzB8pvWSTWZDUaRWqUIt04dhC6tRa+b6MEeaI/jFiBBkO1MhG22HXDm\n/gnQJ8kU+ppk14kubSzFkLtoVe9069LfcLn1kp/pP7KoHSTO0OToZWT2vbuqb4Ra\njVP5noJ1VOxZ7pv26Dd7H32+NQKBgQDRzLrc7f7TPUOYyftdEZzFD+nh9zLypC7s\nv655+aWADvK0srMAdhQTyf7l+VztDflK4qr3LuN0cb3ufNDbHAPFkpW79fLouHzf\nLDnxrnlUFOcWWPSC4/LQ63VcbOWc8adXHv5+APYKEKQl+A6wJjoiD1PZgj5noiAe\nH5XD8CC2BQKBgQDLLwFfCbjcGbw8QaGbHSq813bVQWIAs9x6AENQJyOJ+6sxUWM0\nUK3JVegbu29uQF4b9QeCZGn4lGELRsg8eesfIQjtlTNO+Gt0TiK7xX46wuzFHA86\nxV5AEzVQOVOaxtQf/uK+KImnr8YOmw2ITYPF6T7gHTFp0t3+sYGaO0zrGQKBgFHy\n1T6829+pO4EvzDaTTZgP2jyAcW8jwIyLZtyQLhwyOo1oi9DvTnJYYW91Et4pqimd\nFkjNEN2IHDdOm8oqTDLdSg2MSWCrx2LpBI0pqIy2SXmKL5/85/jBMCt1Ac9m+QVn\nvuJ6/5/41hVaqmoV1Hk/YXJBlJyoUEFT9wz8+9n9AoGBAKlkyHx+WACxWOMr97fN\na+Ls03kugkvJb+PUVu0rMsNKB/i3dTPpz1mqqU7LntMShsd0h+ZoGnBwf6sk2agG\nxs02uEnWkRlmvlWBFOFtahH6bJqG3Kh9pzwN16Rzr/qIgd9bfXlETx6D3SGO3SMR\n84+jm0xK/gLtdy+jE9ViDy8O\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

class AppSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      occupation: "",
      email: "",
      phone: "",
      sheetLoaded: false,
      courses: [],
    };
  }

  _handleChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };
  clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("occupation").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  };
  appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  componentDidMount() {}

  render() {
    let { name, occupation, email, phone } = this.state;
    let { history } = this.props;
    return (
      <div className="a-course-register-form" id="register-form">
        {/* Heading */}

        {/*Form */}
        <div className="a-c-register-heading">
          <div className="a-c-reg-text">
            <h1>Sign Up</h1>
          </div>

          <form className="a-reg-form">
            <div class="a-upper-input">
              <input
                id="name"
                name="name"
                onChange={(name) => {
                  this._handleChange("name", name.target.value);
                }}
                type="text"
                placeholder="Full Name"
                className="a-r-input-box"
              />

              <input
                id="occupation"
                name="occupation"
                onChange={(occ) => {
                  this._handleChange("occupation", occ.target.value);
                }}
                type="text"
                placeholder="Occupation: (Developer, Lawyer, Businessman....)"
                className="a-r-input-box"
              />

              <input
                id="phone"
                name="phone"
                onChange={(phone) => {
                  this._handleChange("phone", phone.target.value);
                }}
                type="text"
                placeholder="Phone"
                className="a-r-input-box"
              />
              <input
                id="email"
                name="email"
                onChange={(email) => {
                  this._handleChange("email", email.target.value);
                }}
                type="email"
                placeholder="Email"
                className="a-r-input-box"
              />
              <button
                type="button"
                class="a-reg-btn"
                onClick={() => {
                  this.appendSpreadsheet({
                    Name: name,
                    Occupation: occupation,
                    Email: email,
                    Phone: phone,
                  }).then(() => {
                    swal({
                      title: "Your from has been submitted",
                      icon: "success",
                    }).then(() => this.clearForm());
                  });
                }}
              >
                Join The Waitlist
              </button>
            </div>
          </form>
        </div>
        <div className="a-reg-frame">
          <img className="a-reg-frame-img" src={require("./pic.png")} />
        </div>
      </div>
    );
  }
}
// export default ReactGoogleSheets.connect(DataComponent);
export default withRouter(AppSignUp);
