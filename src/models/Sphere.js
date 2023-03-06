export class Sphere {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }
}
