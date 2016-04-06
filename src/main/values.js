// Get values of an object.
export function values(obj) {
  let values = [];
  for (let key of Object.keys(obj)) {
    values.push(obj[key]);
  }
  return values;
}
