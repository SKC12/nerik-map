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
