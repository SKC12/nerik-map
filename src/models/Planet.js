export class Planet {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }
}
