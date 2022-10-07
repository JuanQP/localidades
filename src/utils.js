export function setFieldValue(setter) {
  return (element) => setter(element.target.value);
}

export function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomBetween(start = 0, end) {
  return String(Math.floor(Math.random() * end) + start);
}
