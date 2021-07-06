import React from "react";

import "./assets/css/style.css";

const sideDrawer = (props) => {
  let { activeScreen } = props;
  let drawerClass = "side-drawer";
  if (props.show) {
    drawerClass = "side-drawer open";
  }
  return (
    <div className="side-bar">
      <nav className={drawerClass}>
        <ul>
          <li>
            <a
              href={activeScreen != "Home" ? "/" : ""}
              className={activeScreen == "Home" ? "active" : "font-gray"}
            >
              Home
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "Story" ? "/story" : ""}
              className={activeScreen == "Story" ? "active" : "font-gray"}
            >
              Story
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "Plans" ? "/plans" : ""}
              className={activeScreen == "Plans" ? "active" : "font-gray"}
            >
              Plans
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "Community" ? "/community" : ""}
              className={activeScreen == "Community" ? "active" : "font-gray"}
            >
              Community
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "Academy" ? "/academy" : ""}
              className={activeScreen == "Academy" ? "active" : "font-gray"}
            >
              Academy
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "Merch" ? "/merch" : ""}
              className={activeScreen == "Merch" ? "m-active" : "font-gray"}
            >
              Merch
            </a>
          </li>
          <div className="divider1">
            <div></div>
          </div>
          <li>
            <a
              href={activeScreen != "CFO" ? "/CFO" : ""}
              className={activeScreen == "CFO" ? "m-active" : "font-gray"}
            >
              CFO
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default sideDrawer;
