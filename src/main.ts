import "./style.css";
import MapView from "../lib/views/MapView";
import { lngLatToXY } from "../lib/geometry/support/webMercatorUtils";

// const map = new Map();
const view = new MapView({
  // map,
  container: "view",
});
console.log(view);
console.log(lngLatToXY(0, 0));
console.log(lngLatToXY(120, 30));

