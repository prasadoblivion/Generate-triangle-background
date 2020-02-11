import React, { Component } from "react";
import Trianglify from "trianglify";
import { connect } from "react-redux";

class Canvasele extends Component {
  componentDidMount() {
    const pattern = Trianglify(this.props.previewValues);
    pattern.canvas(document.getElementById("preview"));

    this.props.onDrawPattern(pattern);
  }

  componentDidUpdate() {
    const pattern = Trianglify(this.props.previewValues);
    pattern.canvas(document.getElementById("preview"));

    this.props.onDrawPattern(pattern);
  }

  render() {
    return (
      <React.Fragment>
        <canvas id="preview" className="preview"></canvas>
      </React.Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onDrawPattern: inputData => {
      dispatch({ type: "PATTERN_DRAWN", payload: inputData });
    }
  };
};

export default connect(null, mapDispatchtoProps)(Canvasele);
