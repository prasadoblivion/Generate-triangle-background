import React, { Component } from "react";
import Mainappbody from "./components/main/main";
import Topnav from "./components/main/topnav/topnav";
import logo from "./assets/logo.svg";
import { Toast } from "react-bootstrap";
import "./App.scss";

class App extends Component {
  state = {
    showToast: false,
    appInstalled: false,
    appAlreadyInstalled: false
  };

  deferredPrompt = null;

  componentDidMount() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this.deferredPrompt = e;

      if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
        //do nothing
      } else {
        setTimeout(() => {
          this.setState({ showToast: true });
        }, 5000);
      }
    });

    window.addEventListener("appinstalled", e => {
      this.setState({ appInstalled: true });
    });
  }

  handleToastClose = () => {
    this.setState({ showToast: false });
  };

  handleInstallBtnClick = () => {
    this.setState({ showToast: false });

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then(choiceResult => {
      this.deferredPrompt = null;
    });
  };

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

        <Toast show={this.state.showToast} onClose={this.handleToastClose} className="add-to-home-prompt">
          <Toast.Header>
            <img src={logo} className="rounded mr-2 toast-logo" alt="triangle logo" />
            <strong className="mr-auto">Triangle Lite App</strong>
          </Toast.Header>
          <Toast.Body>
            {this.state.appInstalled === false ? (
              <button className="btn btn-success btn-sm" onClick={this.handleInstallBtnClick}>
                Install this app
              </button>
            ) : (
              <p>successfully installed the app.</p>
            )}
          </Toast.Body>
        </Toast>
      </React.Fragment>
    );
  }
}

export default App;
