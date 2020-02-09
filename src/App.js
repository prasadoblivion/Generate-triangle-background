import React, { Component } from "react";
import Mainappbody from "./components/main/main";
import Topnav from "./components/main/topnav/topnav";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <Topnav />
        </header>
        <main>
          <Mainappbody />
        </main>
        <footer></footer>
      </React.Fragment>
    );
  }
}

export default App;
