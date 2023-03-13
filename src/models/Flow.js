export class Flow {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }

  static getEges(flows) {
    console.log(flows);
    let nodes = [];
    for (let i = 0; i < flows.length; i++) {
      //console.log(spheres[i].onMap);
      nodes.push({
        id: flows[i].sphereW + " to " + flows[i].sphereE,
        source: flows[i].sphereW,
        target: flows[i].sphereE,
        type: "floating",
        style: {
          strokeWidth: 0.25,
        },
      });
    }
    return nodes;
  }
}
