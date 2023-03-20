import { useCallback } from "react";
import {
  useStore,
  // getBezierPath,
  // getStraightPath,
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

  //If animation is not enable, remove it from style
  let edgeStyle;
  !data.animation
    ? (edgeStyle = { ...style, animation: "" })
    : (edgeStyle = style);

  //Check for data.Time, if it doesn't exist, check if projectedTime is enabled
  let travelTime = { west: "", east: "" };
  data.timeE
    ? (travelTime.east = `-> ${data.timeE}`)
    : data.projectedTime && !data.type.includes("uni")
    ? (travelTime.east = "-> " + Math.floor(data.dist / data.speed))
    : (travelTime.east = "");
  data.timeW
    ? (travelTime.west = `<- ${data.timeW}`)
    : data.projectedTime && !data.type.includes("uni")
    ? (travelTime.west = "<- " + Math.floor(data.dist / data.speed))
    : (travelTime.west = "");

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
    fontSize: "0.75px",
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
          {travelTime.west}
        </textPath>
      </text>
      <text style={{ transform: `translate${translate.west}` }}>
        <textPath
          href={`#${id}`}
          style={textStyle}
          startOffset="20%"
          textAnchor="middle"
          dominantBaseline="auto"
        >
          {data.typeExtraInfo}
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
          {travelTime.east}
        </textPath>
      </text>
    </>
  );
}

export default FloatingEdge;
