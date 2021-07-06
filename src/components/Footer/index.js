import React, { Component } from "react";
import "./assets/styles/footer.css";

let Footer = (props) => {
  let { activeScreen } = props;
  return (
    // {/*  FOOTER SECTION  */}
    <footer className="footer module">
      <div className="footer-wrapper">
        <div className="footer-left">
          {/*  LOGO AREA  */}
          <div className="logo-area">
            <img
              className="logo"
              alt="logo"
              src={require("./assets/images/wh.png")}
            />
          </div>
          {/*  LEGAL  */}
          <p>
            Copyright © 2019 Work Hall,
            <br />
            Karachi, Pakistan.
            <br />
            All rights reserved.
          </p>
        </div>
        <div className="footer-right">
          {/*  SOCIAL AREA  */}
          <div className="social-area">
            <a
              className="ribbon"
              href={"https://instagram.com/workhall.co?igshid=1f6evawg1tbt8"}
            >
              <img
                src={require("./assets/images/insta.png")}
                alt="Instagaram"
              />
            </a>
            <a
              className="ribbon"
              href={"https://pk.linkedin.com/company/work-hall"}
            >
              <img
                src={require("./assets/images/linkedin.png")}
                alt="Linkedin"
              />
            </a>
            <a className="ribbon" href={"http://www.facebook.com/workhall.co"}>
              <img src={require("./assets/images/fb.png")} alt="Facebook" />
            </a>
            <a
              className="ribbon"
              href={
                "https://www.youtube.com/channel/UCqrxVXnsPqXq9BUnV6jhtqw/featured"
              }
            >
              <img src={require("./assets/images/youtube.png")} alt="Youtube" />
            </a>
          </div>
          {/*  FOOTER LINKS AREA  */}
          <div className="footer-links-area">
            <a
              href={activeScreen != "Home" ? "/" : ""}
              className={activeScreen == "Home" ? "active" : "font-gray"}
            >
              Home
            </a>
            <div className="divider">
              <div></div>
            </div>

            <a
              href={activeScreen != "Story" ? "/story" : ""}
              className={activeScreen == "Story" ? "active" : "font-gray"}
            >
              Story
            </a>

            <div className="divider">
              <div></div>
            </div>
            <a
              href={activeScreen != "Plans" ? "/plans" : ""}
              className={activeScreen == "Plans" ? "active" : "font-gray"}
            >
              Plans
            </a>
            <div className="divider">
              <div></div>
            </div>
            <a
              href={activeScreen != "Community" ? "/community" : ""}
              className={activeScreen == "Community" ? "active" : "font-gray"}
            >
              Community
            </a>
            <div className="divider">
              <div></div>
            </div>
            <a
              href={activeScreen != "Academy" ? "/academy" : ""}
              className={activeScreen == "Academy" ? "active" : "font-gray"}
            >
              Academy
            </a>
            <div className="divider">
              <div></div>
            </div>
            <a
              href={activeScreen != "Merch" ? "/merch" : ""}
              className={activeScreen == "Merch" ? "m-active" : "font-gray"}
            >
              Merch
            </a>

            <div className="divider">
              <div></div>
            </div>
            <a
              href={activeScreen != "cfo" ? "/cfo" : ""}
              className={activeScreen == "Merch" ? "m-active" : "font-gray"}
            >
              Cfo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
