export function round(value, precision = 3) {
  return parseFloat(value.toFixed(precision));
}

export function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

export function adjust(value, fromMin, fromMax, toMin, toMax) {
  return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
}

export function lerp(from, to, factor) {
  return from + (to - from) * factor;
}
