let speedRatio = 4;

function getStyle(flow, scale) {
  let style = {};
  let color = "";
  switch (flow.flowRiver) {
    case "Arcane Inner Flow":
      color = "#fcf003";
      break;
    case "Arcane Outer Flow":
      color = "#fca503";
      break;
    case "Braineater Flow":
      color = "#a503fc";
      break;
    case "Casa Flow":
      color = "#00ad31";
      break;
    case "Crystal Flow":
      color = "#ff00bf";
      break;
    case "Eadhel Flow":
      color = "#90eb8d";
      break;
    case "Gate Flow":
      color = "#94dbf7";
      break;
    case "Hammer Flow":
      color = "#99680e";
      break;
    case "Golot Flow":
      color = "#007874";
      break;
    case "Gorth Flow":
      color = "#b1deca";
      break;
    case "Lost Flow":
      color = "#c2c793";
      break;
    case "Mael Flow":
      color = "#4b3870";
      break;
    case "Mystara Flow":
      color = "#050780";
      break;
    case "Other":
      color = "#575757";
      break;
    case "Pillar Flow":
      color = "#3f6b8f";
      break;
    case "Pirtel Flow":
      color = "#e0e0e0";
      break;
    case "Radiant Flow":
      color = "#ff0000";
      break;
    case "Red-Heart Flow":
      color = "#ff7e1c";
      break;
    case "Seven Stars Flow":
      color = "#d98c52";
      break;
    case "The Maelstrom":
      color = "#d62dc2";
      break;
    case "Trulian Ring":
      color = "#593455";
      break;
    case "Vodoni Flow":
      color = "#0b1d57";
      break;
    case "Vodonika Flow":
      color = "#7d0b13";
      break;
    case "Way Flow":
      color = "#268496";
      break;

    default:
      color = "grey";
  }
  switch (flow.type) {
    case "regular":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${0.5 * scale}`,
      };
      break;
    case "predominantW":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${1 * scale}`,
        animation: `dash 100s linear 0s infinite`,
      };
      break;
    case "predominantE":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${1 * scale}`,
        animation: `dash 100s linear 0s infinite reverse`,
      };
      break;
    case "uniW":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${2 * scale} ${2 * scale}`,
        animation: `dash 20s linear 0s infinite`,
      };
      break;
    case "uniE":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${2 * scale} ${2 * scale}`,
        animation: `dash 20s linear 0s infinite reverse`,
      };
      break;
    case "off flow":
      style = {
        strokeDasharray: `${0.2 * scale} ${1 * scale} ${0.2 * scale} ${
          1 * scale
        }`,

        strokeWidth: 0.1 * scale,
      };
      break;
    case "erratic":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${2 * scale} ${2 * scale} ${1 * scale} ${1 * scale} ${
          1 * scale
        } ${2 * scale}`,
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    case "tide":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: "2 2 1 2",
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    default:
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
      };
  }
  style.stroke = color;
  return style;
}

export class Flow {
  constructor(obj) {
    for (var prop in obj) {
      this[prop] = obj[prop];
    }
  }

  static getEges(flows, scale = 1) {
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
