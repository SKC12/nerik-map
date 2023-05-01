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

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

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

export function getStyle(flow, flowRiverColors, scale = 1) {
  let speedRatio = 5;
  let strokeRatio = scale / speedRatio;

  let style = {};
  let color = flowRiverColors[flow.flowRiver]
    ? flowRiverColors[flow.flowRiver]
    : "#575757";

  switch (flow.type) {
    case "regular":
      style = {
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${0.5 * scale}`,
      };
      break;
    case "predominantW":
      style = {
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${1 * scale}`,
        animation: `dash 100s linear 0s infinite`,
      };
      break;
    case "predominantE":
      style = {
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${1 * scale}`,
        animation: `dash 100s linear 0s infinite reverse`,
      };
      break;
    case "uniW":
      style = {
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${2 * scale} ${2 * scale}`,
        animation: `dash 20s linear 0s infinite`,
      };
      break;
    case "uniE":
      style = {
        strokeWidth: strokeRatio * flow.speed,
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
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${1 * scale} ${1 * scale} ${0.5 * scale} ${
          0.5 * scale
        } ${0.5 * scale} ${1 * scale}`,
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    case "tide":
      style = {
        strokeWidth: strokeRatio * flow.speed,
        strokeDasharray: `${1 * scale} ${1 * scale} ${0.5 * scale} ${
          1 * scale
        }`,
        // animation: `flicker 5s linear 0s infinite alternate`,
      };
      break;
    default:
      style = {
        strokeWidth: strokeRatio * flow.speed,
      };
  }
  if (flow.isKnown === "no") style.opacity = "50%";
  style.stroke = color;
  return style;
}

export function getShapeFromUnicode(unicode) {
  switch (unicode) {
    case "\u003f":
      return "Special";
    case "\u2021":
      return "Belt";
    case "\u25b3":
      return "Regular";
    case "\u25d7":
      return "Flat";
    case "\u2744":
      return "Amorphous";
    case "\u2751":
      return "Cube";
    case "\u039f":
      return "Ellipsoid";
    case "\ue008":
      return "Sphere";
    case "\ue00d":
      return "Cluster";
    case "\ue47a":
      return "Irregular";
    default:
      return "";
  }
}

export function getUnicodeFromShape(unicode) {
  switch (unicode) {
    case "Special":
      return "\u003f";
    case "Belt":
      return "\u2021";
    case "Regular":
      return "\u25b3";
    case "Flat":
      return "\u25d7";
    case "Amorphous":
      return "\u2744";
    case "Cube":
      return "\u2751";
    case "Ellipsoid":
      return "\u039f";
    case "Sphere":
      return "\ue008";
    case "Cluster":
      return "\ue47a";
    case "Irregular":
      return "\ue47a";
    default:
      return "";
  }
}

export function getCoords(radius, angle) {
  return {
    x: radius * Math.sin((Math.PI * angle) / 180),
    y: radius * Math.cos((Math.PI * angle) / 180),
  };
}
