export class Sphere {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }

  static getNodes(spheres, scale = 1) {
    //console.log(spheres);
    let nodes = [];
    for (let i = 0; i < spheres.length; i++) {
      //console.log(spheres[i].onMap);
      if (spheres[i]["onMap?"] === "Yes") {
        nodes.push({
          id: spheres[i].shortName,
          type: "sphereNode",
          // 11 is the offset from the original map
          position: {
            x: (spheres[i].xCoord - 11) * scale,
            y: (spheres[i].yCoord - 11) * scale,
          },
          data: { ...spheres[i], scale: scale },
        });
      }
    }
    return nodes;
  }
}
