import { Position } from "reactflow";

function getNodeIntersection(intersectionNode, targetNode) {
  let radius = intersectionNode.width / 2;
  let p1 = intersectionNode.position;
  let p2 = targetNode.position;
  let h = p1.y - p2.y;
  let w = p2.x - p1.x;
  const angle = Math.atan2(h, w);
  const dx = radius * Math.cos(angle);
  const x = p1.x + dx;
  const dy = radius * Math.sin(angle);
  const y = p1.y - dy;
  //console.log(p1, h, w, radius, angle, dx, dy, x, y);

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  //console.log("N", n, px, py, nx, ny, n.width);

  if (px <= nx - n.width / 2) {
    return Position.Left;
  }
  if (px >= nx + n.width / 2) {
    return Position.Right;
  }
  if (py <= ny - n.width / 2) {
    return Position.Top;
  }
  if (py >= n.y + n.height / 2) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

function getFlowColor(flowRiver) {
  let color = "";
  switch (flowRiver) {
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
      color = "#575757";
  }
  return color;
}

export function getStyle(flow, scale = 1) {
  let speedRatio = 5;

  let style = {};
  let color = getFlowColor(flow.flowRiver);

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
        strokeDasharray: `${1 * scale} ${1 * scale} ${0.5 * scale} ${
          0.5 * scale
        } ${0.5 * scale} ${1 * scale}`,
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    case "tide":
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
        strokeDasharray: `${1 * scale} ${1 * scale} ${0.5 * scale} ${
          1 * scale
        }`,
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    default:
      style = {
        strokeWidth: scale * (flow.speed / speedRatio),
      };
  }
  if (flow.isKnown === "no") style.opacity = "50%";
  style.stroke = color;
  return style;
}
