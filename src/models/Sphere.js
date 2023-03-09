export class Sphere {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }

  static getNodes(spheres) {
    console.log(spheres);
    let nodes = [];
    for (let i = 0; i < spheres.length; i++) {
      nodes.push({
        id: spheres[i].sphere,
        type: "sphereNode",
        position: { x: spheres[i].xCoord, y: spheres[i].yCoord },
        data: spheres[i],
      });
    }
    return nodes;
  }
}
