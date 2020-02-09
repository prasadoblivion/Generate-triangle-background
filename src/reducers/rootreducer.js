import Trianglify from "trianglify";

let pallet = ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"];
const randomValue = Math.floor(Math.random() * 26);

let count = 1;
Object.entries(Trianglify.colorbrewer).forEach(([item, index]) => {
  if (count === randomValue) {
    pallet = Trianglify.colorbrewer[item];
  }
  count++;
});

const initialState = [
  {
    colorBrewerPallets: Trianglify.colorbrewer,
    TrianglifyValues: {
      cell_size: 75,
      variance: 0.75,
      x_colors: pallet,
      y_colors: "match_x",
      palette: Trianglify.colorbrewer,
      color_space: "lab",
      color_function: false,
      stroke_width: 1.51,
      width: 1920,
      height: 1080,
      seed: null
    },
    customColorPallet: ["#f50057", "#1a237e"]
  }
];

function rootReducer(state = initialState, action) {
  if (action.type === "WIDTH_CHANGED") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, width: parseFloat(action.payload) }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "HEIGHT_CHANGED") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, height: parseFloat(action.payload) }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "VARIANCE_CHANGED") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, variance: parseFloat(action.payload) }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "CELL_SIZE_CHANGED") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, cell_size: parseFloat(action.payload) }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "RANDOMIZE") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, x_colors: action.payload[0], variance: parseFloat(action.payload[1]), cell_size: parseFloat(action.payload[2]) }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "COLORBREWER_PALLET_SELECTED") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, x_colors: action.payload }, customColorPallet: [...state[0].customColorPallet] }];
  }

  if (action.type === "SAVE_CUSTOM_COLOR_PALLET") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues, x_colors: action.payload }, customColorPallet: action.payload }];
  }

  if (action.type === "UPDATE_CUSTOM_COLOR_PALLET") {
    return [{ colorBrewerPallets: state[0].colorBrewerPallets, TrianglifyValues: { ...state[0].TrianglifyValues }, customColorPallet: action.payload }];
  }

  return state;
}

export default rootReducer;
