export function isNumeric(number) {
  return !isNaN(number) && !isNaN(parseFloat(number));
}