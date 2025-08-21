import { earth } from "./Ellipsoid";

const RADIANS_TO_DEGREES = 57.29577951308232;
const DEGREES_TO_RADIANS = 0.017453292519943;

function radiansToDegrees(radians: number): number {
  return radians * RADIANS_TO_DEGREES;
}

function degreesToRadians(degrees: number): number {
  return degrees * DEGREES_TO_RADIANS;
}

function x2lon(x: number): number {
  return x / earth.radius;
}

function y2lat(y: number): number {
  return Math.PI / 2 - 2 * Math.atan(Math.exp(-y / earth.radius));
}

function lngLatToXY(
  longitude: number,
  latitude: number,
  result: [number, number] = [0, 0],
): [number, number] {
  if (latitude > 89.99999) {
    latitude = 89.99999;
  } else if (latitude < -89.99999) {
    latitude = -89.99999;
  }

  const latRad = degreesToRadians(latitude);
  result[0] = degreesToRadians(longitude) * earth.radius;
  result[1] =
    earth.halfSemiMajorAxis *
    Math.log((1 + Math.sin(latRad)) / (1 - Math.sin(latRad)));

  return result;
}

function xyToLngLat(
  x: number,
  y: number,
  result: [number, number] = [0, 0],
  normalize: boolean = false,
): [number, number] {
  const R0 = -Math.PI * earth.radius;
  const R1 = Math.PI * earth.radius;

  if (x === R0) {
    result[0] = -180;
  } else if (x === R1) {
    result[0] = 180;
  } else {
    const longitudeDegrees = radiansToDegrees(x / earth.radius);
    if (normalize) {
      result[0] = longitudeDegrees;
    } else {
      result[0] =
        longitudeDegrees - 360 * Math.floor((longitudeDegrees + 180) / 360);
    }
  }

  result[1] = radiansToDegrees(
    Math.PI / 2 - 2 * Math.atan(Math.exp(-y / earth.radius)),
  );

  return result;
}

export { lngLatToXY, x2lon, xyToLngLat, y2lat };
