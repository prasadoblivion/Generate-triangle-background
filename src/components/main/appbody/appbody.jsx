import React, { Component } from "react";
import { connect } from "react-redux";
import Canvasele from "./canvas";
import "./appbody.scss";

class Appbody extends Component {
  render() {
    return (
      <div className="previewContainer">
        <Canvasele previewValues={this.props.TrianglifyValues} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    TrianglifyValues: state[0].TrianglifyValues
  };
};

export default connect(mapStateToProps, null)(Appbody);
