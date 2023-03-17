import { useCallback } from "react";
import {
  useStore,
  getBezierPath,
  getStraightPath,
  getSimpleBezierPath,
} from "reactflow";
import "../style/Sphere.css";

import { getEdgeParams } from "./utils.js";

function getTranslate(data) {
  let yCoordW = parseInt(data.yCoordW);
  let yCoordE = parseInt(data.yCoordE);
  let xCoordW = parseInt(data.xCoordW);
  let xCoordE = parseInt(data.xCoordE);

  //console.log(data, yCoordW < yCoordE);
  if (Math.abs(xCoordW - xCoordE) / Math.abs(yCoordW - yCoordE) >= 0.75) {
    return { west: "(-0.5px,-0.5px)", east: "(0.5px,0.5px)" };
  } else if (yCoordW < yCoordE) {
    return { west: "(0.5px,-0.5px)", east: "(-0.5px,0.5px)" };
  } else {
    return { west: "(-0.5px,0.5px)", east: "(0.5px,-0.5px)" };
  }
}

function FloatingEdge({ id, source, target, markerEnd, style, data }) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  let edgeStyle;
  !data.animation
    ? (edgeStyle = { ...style, animation: "" })
    : (edgeStyle = style);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getSimpleBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  const translate = getTranslate(data);

  const textStyle = {
    fontSize: "1px",
    height: "10px",
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={edgeStyle}
      />
      <text style={{ transform: `translate${translate.west}` }}>
        <textPath
          href={`#${id}`}
          style={textStyle}
          startOffset="50%"
          textAnchor="middle"
          dominantBaseline="auto"
        >
          {data.timeW ? `<-- ${data.timeW}` : ""}
        </textPath>
      </text>
      <text style={{ transform: `translate${translate.east}` }}>
        <textPath
          href={`#${id}`}
          style={textStyle}
          startOffset="50%"
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          {data.timeE ? `--> ${data.timeE}` : ""}
        </textPath>
      </text>
    </>
  );
}

export default FloatingEdge;
