import { getStyle } from "../Components/utils.js";

export class Flow {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }

  static getEdges(flows, scale = 1) {
    //console.log(flows);
    let edges = [];
    for (let i = 0; i < flows.length; i++) {
      let style = getStyle(flows[i], scale);
      //console.log(flows[i].speed);
      edges.push({
        id: flows[i].sphereW + " to " + flows[i].sphereE,
        source: flows[i].sphereW,
        target: flows[i].sphereE,
        type: "floating",
        style: style,
        data: { ...flows[i], scale: scale },
      });
    }
    return edges;
  }
}
