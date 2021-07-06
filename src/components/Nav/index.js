import React, { Component } from "react";
import "./assets/styles/nav.css";
import "../Nav/assets/styles/nav.css";
import $ from "jquery";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

let Nav = (props) => {
  let { activeScreen, page } = props;
  return (
    // {/*   NAVIGATION  */}
    <nav>
      {/*  WRAPPER  */}
      <div className="wrapper">
        {/*  LOGO AREA  */}
        <div className="logo-area">
          <img
            className="logo"
            alt="logo"
            src={require("./assets/images/wh.png")}
          />
        </div>
        {/*  NAV AREA  */}
        <div className="nav-area">
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
            className={activeScreen == "Academy" ? "a-active" : "font-gray"}
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
            href={activeScreen != "CFO" ? "/cfo" : ""}
            className={activeScreen == "CFO" ? "Cfo-active" : "font-gray"}
          >
            CFO
          </a>
        </div>

        {/*  RESPONSIVE MENU LINK - RML  */}
        <div className={page}>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        {/* <button
          onClick={props.drawerClickHandler}
          className="RML">
          <img src={require('./assets/images/menu.png')} alt="MENU" />
        </button> */}

        {/*  SOCIAL AREA  */}
        {/*  SOCIAL AREA  */}
        <div className="social-area">
          <a
            className="ribbon"
            href={"https://instagram.com/workhall.co?igshid=1f6evawg1tbt8"}
            target="_blank"
          >
            <img src={require("./assets/images/insta.png")} alt="Instagaram" />
          </a>
          <a
            className="ribbon"
            href={"https://pk.linkedin.com/company/work-hall"}
            target="_blank"
          >
            <img src={require("./assets/images/linkedin.png")} alt="Linkedin" />
          </a>
          <a
            className="ribbon"
            href={"http://www.facebook.com/workhall.co"}
            target="_blank"
          >
            <img src={require("./assets/images/fb.png")} alt="Facebook" />
          </a>
          <a
            className="ribbon"
            href={
              "https://www.youtube.com/channel/UCqrxVXnsPqXq9BUnV6jhtqw/featured"
            }
            target="_blank"
          >
            <img src={require("./assets/images/youtube.png")} alt="Youtube" />
          </a>
        </div>
        {/*  GAP AREA  */}
        <div className="gap-area"></div>
      </div>
    </nav>
  );
};
export default Nav;
