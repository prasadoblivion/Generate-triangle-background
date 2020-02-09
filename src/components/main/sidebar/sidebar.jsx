import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card } from "react-bootstrap";
import "./sidebar.scss";

class Sidebar extends Component {
  state = {
    colorBrewerToggleStatus: true,
    customToggleStatus: false
  };

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
    let pallet = this.props.TrianglifyValues.x_colors;
    let variance = this.props.TrianglifyValues.variance;
    let cell_size = this.props.TrianglifyValues.cell_size;

    if (document.getElementById("needRandomVariance").checked) {
      variance = Math.random();
      document.getElementById("variance").value = variance;
    }

    if (document.getElementById("needRandomCellSize").checked) {
      cell_size = Math.random() * 250 + 60;
      document.getElementById("cell_size").value = cell_size;
    }

    if (document.getElementById("needRandomColors").checked) {
      const randomValue = Math.floor(Math.random() * 26);

      let count = 1;
      Object.entries(this.props.colorBrewerPallet).forEach(([item, index]) => {
        if (count === randomValue) {
          pallet = this.props.colorBrewerPallet[item];
        }
        count++;
      });
    }

    this.props.onRandomizeBtnClick([pallet, variance, cell_size]);
  };

  handleColorBrewerTabClicked = () => {
    if (this.state.colorBrewerToggleStatus) {
      this.setState({ colorBrewerToggleStatus: false });
    } else {
      this.setState({ colorBrewerToggleStatus: true });
      this.setState({ customToggleStatus: false });
    }
  };

  handleCustomTabClicked = () => {
    if (this.state.customToggleStatus) {
      this.setState({ customToggleStatus: false });
    } else {
      this.setState({ customToggleStatus: true });
      this.setState({ colorBrewerToggleStatus: false });
    }
  };

  handleCustomColorPalletSaveBtnClick = () => {
    let customColorPallet = [];
    const customColorPalletInputEle = document.querySelectorAll('[data-custom-color="custom-color-input"]');
    customColorPalletInputEle.forEach((item, itemIndex) => {
      customColorPallet.push(item.value);
    });

    this.props.saveCustomColorPallet(customColorPallet);
  };

  handleAddCustomColor = () => {
    const newCustomColorPallet = [...this.props.customColorPallet];
    if (newCustomColorPallet.length < 15) {
      newCustomColorPallet.push("#28a745");
      this.props.updateCustomColorPallet(newCustomColorPallet);
    } else {
      alert("Sorry, Cannot add more than 15 colors.");
    }
  };

  handleRemoveCustomColor = () => {
    const newCustomColorPallet = [...this.props.customColorPallet];
    if (newCustomColorPallet.length > 2) {
      newCustomColorPallet.pop();
      this.props.updateCustomColorPallet(newCustomColorPallet);
    } else {
      alert("Sorry, At-least 2 colors required.");
    }
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

    const customPalletColors = this.props.customColorPallet.map((color, colorIndex) => {
      return <input type="color" defaultValue={color} data-custom-color="custom-color-input" key={colorIndex}></input>;
    });

    const customPallet = (
      <div className="flex-box color-pallet-btn custom" id="customColorPalletcontainer">
        {customPalletColors}
      </div>
    );

    return (
      <React.Fragment>
        <div className="flex-box dimension-container">
          <div className="form-group">
            <label htmlFor="width" className="small">
              Width
            </label>
            <input type="number" className="form-control" id="width" aria-describedby="width" defaultValue={this.props.TrianglifyValues.width} onBlur={this.handleWidthValueChange} />
          </div>

          <div className="form-group">
            <label htmlFor="height" className="small">
              Height
            </label>
            <input type="number" className="form-control" id="height" aria-describedby="height" defaultValue={this.props.TrianglifyValues.height} onBlur={this.handleHeightValueChange} />
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

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="needRandomVariance" name="needRandomVariance" defaultChecked />
          <label className="form-check-label small" htmlFor="needRandomVariance">
            Use random variance while randomizing
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="needRandomCellSize" name="needRandomCellSize" defaultChecked />
          <label className="form-check-label small" htmlFor="needRandomCellSize">
            Use random cell size while randomizing
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="needRandomColors" name="needRandomColors" defaultChecked />
          <label className="form-check-label small" htmlFor="needRandomColors">
            Use random colors while randomizing
          </label>
        </div>

        <div>
          <br />
        </div>

        <div>
          <div className="form-group text-center">
            <button className="btn btn-danger" onClick={this.handleRandomizeButtonClicked}>
              Randomize
            </button>
          </div>
        </div>

        <div className="d-none d-md-block d-lg-block">
          <br />
        </div>

        <div>
          <span className="span-label small">Color Pallet</span>

          <Accordion defaultActiveKey="0">
            <Card>
              <div className="flex-box">
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={this.handleColorBrewerTabClicked} className={this.state.colorBrewerToggleStatus === true ? "active" : ""}>
                  Colorbrewer
                </Accordion.Toggle>
                <Accordion.Toggle as={Card.Header} eventKey="1" onClick={this.handleCustomTabClicked} className={this.state.customToggleStatus === true ? "active" : ""}>
                  Custom
                </Accordion.Toggle>
              </div>

              <Accordion.Collapse eventKey="0">
                <Card.Body>{ColorBrewerPallets}</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {customPallet}
                  <br />
                  <div className="text-center">
                    <button className="btn btn-secondary add-remove-btn" title="Add color" aria-label="Add color" onClick={this.handleAddCustomColor}>
                      +
                    </button>

                    <button className="btn btn-success" title="Save custom color pallet" aria-label="Save custom color pallet" onClick={this.handleCustomColorPalletSaveBtnClick}>
                      Save
                    </button>

                    <button className="btn btn-secondary add-remove-btn" title="Remove color" aria-label="Remove color" onClick={this.handleRemoveCustomColor}>
                      -
                    </button>
                  </div>
                </Card.Body>
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
    TrianglifyValues: state[0].TrianglifyValues,
    customColorPallet: state[0].customColorPallet
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
    },
    saveCustomColorPallet: inputVal => {
      dispatch({ type: "SAVE_CUSTOM_COLOR_PALLET", payload: inputVal });
    },
    updateCustomColorPallet: inputVal => {
      dispatch({ type: "UPDATE_CUSTOM_COLOR_PALLET", payload: inputVal });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
