let speedRatio = 4;

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
      let style = {};
      switch (flows[i].type) {
        case "regular":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: 1,
            animationName: `dash 100s linear 0s infinite`,
          };
          break;
        case "predominantW":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: 1,
            animation: `dash 100s linear 0s infinite`,
          };
          break;
        case "predominantE":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: 1,
            animation: `dash 15s linear 0s infinite reverse`,
          };
          break;
        case "uniW":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: "2 2",
            animation: `dash 20s linear 0s infinite`,
          };
          break;
        case "uniE":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: "2 2",
            animation: `dash 20s linear 0s infinite reverse`,
          };
          break;
        case "off flow":
          style = {
            strokeDasharray: "2 2 0.2 2",

            strokeWidth: 0.1,
          };
          break;
        case "erratic":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: "2 2 1 1 1 2",
            animation: `flicker 5s linear 0s infinite alternate`,
          };
          break;
        case "tide":
          style = {
            strokeWidth: flows[i].speed / speedRatio,
            strokeDasharray: "2 2 1 2",
            animation: `flicker 5s linear 0s infinite alternate`,
          };
          break;
        default:
          style = {
            strokeWidth: flows[i].speed / speedRatio,
          };
      }
      //console.log(flows[i].speed);
      nodes.push({
        id: flows[i].sphereW + " to " + flows[i].sphereE,
        source: flows[i].sphereW,
        target: flows[i].sphereE,
        type: "floating",
        style: style,
      });
    }
    return nodes;
  }
}
