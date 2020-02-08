import React, { Component } from "react";
import Trianglify from "trianglify";

class Canvasele extends Component {
  componentDidMount() {
    const pattern = Trianglify(this.props.previewValues);
    pattern.canvas(document.getElementById("preview"));
  }

  render() {
    const pattern = Trianglify(this.props.previewValues);
    pattern.canvas(document.getElementById("preview"));

    return (
      <React.Fragment>
        <canvas id="preview" className="preview"></canvas>
      </React.Fragment>
    );
  }
}

export default Canvasele;
