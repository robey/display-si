// atto femto pico nano micro milli, kilo mega giga tera peta exa
const SI_LABELS = "afpnum KMGTPE";

const LOG10 = Math.log(10);
const CURRENCY_FACTOR = Math.pow(10, 1/3);
const LOG_CURRENCY = Math.log(CURRENCY_FACTOR);

// base 10 operations

function opToPrecision(n: number, digits: number, op: (n: number) => number): number {
  if (n == 0) return 0;
  const scale = digits - Math.floor(Math.log(n) / LOG10) - 1;
  return op(n * Math.pow(10, scale)) * Math.pow(10, -scale);
}

export function roundToPrecision(n: number, digits: number): number {
  return opToPrecision(n, digits, Math.round);
}

export function ceilToPrecision(n: number, digits: number): number {
  return opToPrecision(n, digits, Math.ceil);
}

export function floorToPrecision(n: number, digits: number): number {
  return opToPrecision(n, digits, Math.floor);
}

// currency-base operations

function opToCurrency(n: number, op: (n: number) => number): number {
  if (n == 0) return 0;

  // drop to between 1 and 10.
  const scale = Math.floor(Math.log(n) / LOG10);
  return Math.pow(10, scale) * op(Math.pow(10, -scale) * n);
}

export function roundToCurrency(n: number): number {
  return opToCurrency(n, scaled => {
    return scaled > 5.0 ?
      Math.round(scaled / 5.0) * 5 :
      (scaled > 2.0 ? Math.round((scaled - 2) / 3) * 3 + 2 : Math.round(scaled));
  });
}

export function ceilToCurrency(n: number): number {
  return opToCurrency(n, scaled => {
    return scaled > 5.0 ? 10 : (scaled > 2.0 ? 5 : (scaled > 1.0 ? 2 : 1));
  });
}

export function floorToCurrency(n: number): number {
  return opToCurrency(n, scaled => {
    return scaled >= 5.0 ? 5 : (scaled >= 2.0 ? 2 : 1);
  });
}

// SI conversion

export function toSI(n: number, base: number = 1000.0): string {
  let index = SI_LABELS.indexOf(" ");
  let detail = Math.abs(n);
  while (detail >= base && index < SI_LABELS.length - 1) {
    detail /= base;
    index++;
  }
  while (detail < 1.0 && detail != 0 && index > 0) {
    detail *= base;
    index--;
  }
  let label = SI_LABELS[index];
  if (label == " ") {
    label = "";
  } else {
    detail = (detail < 10 ? roundToPrecision(detail, 2) : Math.round(detail));
  }

  let detailStr = detail.toString().slice(0, 4);
  // compensate for sloppy floating-point rounding:
  while (detailStr.indexOf(".") > 0 && detailStr[detailStr.length - 1] == "0") {
    detailStr = detailStr.slice(0, -1);
  }

  return (n < 0 ? "-" : "") + detailStr + label;
}

export function toBinarySI(n: number): string {
  return toSI(n, 1024.0);
}

// function magnitude(n: number, base: number = 1000.0): string {
//   let label = HUMAN_LABELS[index];
//   if (label == " ") label = "";
//   number = number.toString().slice(0, 4);
//   // compensate for sloppy floating-point rounding:
//   while (number.indexOf(".") > 0 && number[number.length - 1] == "0") {
//     number = number.slice(0, number.length - 1);
//   }
//   return number + label;
// }
//
// humanize = (number) ->
//   number = roundToPrecision(number, 4)
//   label = HUMAN_LABELS[index]
//   if label == " " then label = ""
//   lpad(number.toString()[...5], 5) + label
//
//
// lpad = (s, n) ->
//   if s.length >= n then return s
//   lpad("          "[0 ... n - s.length] + s, n)
//
//
// exports.humanize = humanize
// exports.roundToPrecision = roundToPrecision
// exports.roundToCurrency = roundToCurrency
// exports.maxByKey = maxByKey
