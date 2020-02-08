import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card } from "react-bootstrap";
import "./sidebar.scss";

class Sidebar extends Component {
  handleColorBrewerPalletClick = palletValue => {
    this.props.onColorBrewerPalletSelected(palletValue);
  };

  handleWidthValueChange = () => {
    this.props.onWidthValueChange(document.getElementById("width").value);
  };

  handleHeightValueChange = () => {
    this.props.onHeightValueChange(document.getElementById("height").value);
  };

  handleVarianceValueChange = () => {
    this.props.onVarianceValueChange(document.getElementById("variance").value);
  };

  handleCellSizeValueChange = () => {
    this.props.onCellSizeValueChange(document.getElementById("cell_size").value);
  };

  handleRandomizeButtonClicked = () => {
    let pallet = ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"];
    const variance = Math.random();
    const cell_size = Math.random() * 250 + 60;

    const randomValue = Math.floor(Math.random() * 26);

    let count = 1;
    Object.entries(this.props.colorBrewerPallet).forEach(([item, index]) => {
      if (count === randomValue) {
        pallet = this.props.colorBrewerPallet[item];
      }
      count++;
    });

    this.props.onRandomizeBtnClick([pallet, variance, cell_size]);

    document.getElementById("variance").value = variance;
    document.getElementById("cell_size").value = cell_size;
  };

  render() {
    const ColorBrewerPallets = [];
    Object.entries(this.props.colorBrewerPallet).forEach(([item, index]) => {
      const colorPalletBtnBG = this.props.colorBrewerPallet[item].map((colorItem, colorIndex) => {
        return <span style={{ backgroundColor: colorItem }} key={colorIndex}></span>;
      });

      const ColorBrewerPalletsBtn = (
        <button
          onClick={() => {
            this.handleColorBrewerPalletClick(this.props.colorBrewerPallet[item]);
          }}
          key={index}
          className="flex-box color-pallet-btn"
        >
          {colorPalletBtnBG}
        </button>
      );

      ColorBrewerPallets.push(ColorBrewerPalletsBtn);
    });

    return (
      <React.Fragment>
        <div className="flex-box dimension-container">
          <div className="form-group">
            <label htmlFor="width" className="small">
              Width
            </label>
            <input type="number" className="form-control" id="width" aria-describedby="width" defaultValue={this.props.TrianglifyValues.width} onChange={this.handleWidthValueChange} />
          </div>

          <div className="form-group">
            <label htmlFor="height" className="small">
              Height
            </label>
            <input type="number" className="form-control" id="height" aria-describedby="height" defaultValue={this.props.TrianglifyValues.height} onChange={this.handleHeightValueChange} />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="variance" className="small">
              Variance
            </label>
            <input type="range" className="form-control-range slider" min="0" max="1" step="0.01" defaultValue={this.props.TrianglifyValues.variance} name="variance" id="variance" onChange={this.handleVarianceValueChange} />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="cell_size" className="small">
              Cell size
            </label>
            <input type="range" className="form-control-range slider" min="60" max="250" step="1" defaultValue={this.props.TrianglifyValues.cell_size} name="cell_size" id="cell_size" onChange={this.handleCellSizeValueChange} />
          </div>
        </div>

        <br />

        <div>
          <div className="form-group text-center">
            <button className="btn btn-danger" onClick={this.handleRandomizeButtonClicked}>
              Randomize
            </button>
          </div>
        </div>

        <div>
          <span className="span-label small">Color Pallet</span>

          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Colorbrewer
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{ColorBrewerPallets}</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Custom
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorBrewerPallet: state[0].colorBrewerPallets,
    TrianglifyValues: state[0].TrianglifyValues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onWidthValueChange: inputVal => {
      dispatch({ type: "WIDTH_CHANGED", payload: inputVal });
    },
    onHeightValueChange: inputVal => {
      dispatch({ type: "HEIGHT_CHANGED", payload: inputVal });
    },
    onVarianceValueChange: inputVal => {
      dispatch({ type: "VARIANCE_CHANGED", payload: inputVal });
    },
    onCellSizeValueChange: inputVal => {
      dispatch({ type: "CELL_SIZE_CHANGED", payload: inputVal });
    },
    onRandomizeBtnClick: inputVal => {
      dispatch({ type: "RANDOMIZE", payload: inputVal });
    },
    onColorBrewerPalletSelected: inputVal => {
      dispatch({ type: "COLORBREWER_PALLET_SELECTED", payload: inputVal });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
