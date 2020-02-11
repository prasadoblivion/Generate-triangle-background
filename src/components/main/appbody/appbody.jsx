import React, { Component } from "react";
import { connect } from "react-redux";
import Canvasele from "./canvas";
import { Modal } from "react-bootstrap";
import "./appbody.scss";

class Appbody extends Component {
  state = {
    modalToggleStatus: false,
    pngURI: null
  };

  toggleModal = () => {
    const tempPng = this.props.TrianglifyOutput.png();

    if (this.state.modalToggleStatus) {
      this.setState({ modalToggleStatus: false });
    } else {
      this.setState({ modalToggleStatus: true, pngURI: tempPng });
    }
  };

  handleDownloadSVGBtnClick = () => {
    const svg = this.props.TrianglifyOutput.svg({ includeNamespace: true });

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    document.getElementById("downloadSVGBtn").setAttribute("href", url);
  };

  handleDownloadPNGBtnClick = () => {
    const pngURI = this.props.TrianglifyOutput.png();
    document.getElementById("downloadPNGBtn").setAttribute("href", pngURI);
  };

  render() {
    return (
      <React.Fragment>
        <div className="previewContainer">
          <Canvasele previewValues={this.props.TrianglifyValues} />

          <button className="btn btn-outline-danger export-btn" onClick={this.toggleModal}>
            Export
          </button>
        </div>

        <Modal show={this.state.modalToggleStatus} onHide={this.toggleModal} size="md" aria-labelledby="Export" centered>
          <Modal.Header closeButton>
            <Modal.Title>Export</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="export-preview-img-container">
              <img src={this.state.pngURI} alt="export preview" className="export-preview-img" />
            </div>
            <div className="flex-box download-section">
              <div>
                <a href="#preview" target="_blank" className="btn btn-outline-danger" id="downloadSVGBtn" download onClick={this.handleDownloadSVGBtnClick}>
                  Export as SVG
                </a>
              </div>
              <div>
                <a href="#preview" target="_blank" className="btn btn-outline-danger" id="downloadPNGBtn" download onClick={this.handleDownloadPNGBtnClick}>
                  Export as PNG
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    TrianglifyValues: state[0].TrianglifyValues,
    TrianglifyOutput: state[0].TrianglifyOutput
  };
};

export default connect(mapStateToProps, null)(Appbody);
