import React, { Component } from "react";
import { connect } from "react-redux";
import Canvasele from "./canvas";
import { Modal, Button } from "react-bootstrap";
import Trianglify from "trianglify";
import "./appbody.scss";

class Appbody extends Component {
  state = {
    modalToggleStatus: false
  };

  toggleModal = () => {
    if (this.state.modalToggleStatus) {
      this.setState({ modalToggleStatus: false });
    } else {
      this.setState({ modalToggleStatus: true });
    }
  };

  handleDownloadSVGBtnClick = () => {
    const pattern = Trianglify(this.props.previewValues);
    const svg = pattern.svg({ includeNamespace: true });

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
    var pngURI = Trianglify(this.props.previewValues).png();
    document.getElementById("downloadPNGBtn").setAttribute("href", pngURI);

    // var data = pngURI.substr(pngURI.indexOf('base64') + 7);
  };

  render() {
    return (
      <React.Fragment>
        <div className="previewContainer">
          <Canvasele previewValues={this.props.TrianglifyValues} />

          <button className="btn btn-dark export-btn" onClick={this.toggleModal}>
            Export
          </button>
        </div>

        <Modal show={this.state.modalToggleStatus} onHide={this.toggleModal} size="md" aria-labelledby="Export" centered>
          <Modal.Header closeButton>
            <Modal.Title>Export</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex-box download-section">
              <div>
                <a href="#preview" target="_blank" className="btn btn-outline-danger" id="downloadSVGBtn" download onClick={this.handleDownloadSVGBtnClick}>
                  SVG
                </a>
                <br />
                Export as SVG
              </div>
              <div>
                <a href="#preview" target="_blank" className="btn btn-outline-danger" id="downloadPNGBtn" download onClick={this.handleDownloadPNGBtnClick}>
                  PNG
                </a>
                <br />
                Export as PNG
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="danger" onClick={this.toggleModal}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    TrianglifyValues: state[0].TrianglifyValues
  };
};

export default connect(mapStateToProps, null)(Appbody);
