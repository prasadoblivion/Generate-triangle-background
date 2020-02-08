import React, { Component } from "react";
import Sidebar from "./sidebar/sidebar";
import Appbody from "./appbody/appbody";
import "./main.scss";

class Mainappbody extends Component {
  render() {
    return (
      <div className="flex-box app-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="app-op-preview">
          <Appbody />
        </div>
      </div>
    );
  }
}

export default Mainappbody;
