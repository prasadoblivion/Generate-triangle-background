import React, { Component } from "react";
import "./topnav.scss";
import logo from "../../../assets/logo.svg";

class Topnav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img src={logo} alt="logo" />
          Triangle
        </span>

        <div className="navbar-nav ml-auto top-nav-link">
          <span className="btn nav-item inline-flex">
            <span role="img" aria-label="Powered by" title="Powered by" className="d-md-none">
              💪 :
            </span>
            <span className="d-none d-md-block">Powered by :</span>
          </span>
          <a className="nav-item nav-link active" href="https://github.com/qrohlf/trianglify" target="_blank" rel="noopener noreferrer">
            Trianglify
          </a>
        </div>
      </nav>
    );
  }
}

export default Topnav;
