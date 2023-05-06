import { useCallback, useMemo } from "react";
import {
  // getBezierPath,
  // getStraightPath,
  getSimpleBezierPath,
} from "reactflow";
import "../../style/Sphere.css";
import { useStore as useReactFlowStore } from "reactflow";

import { getEdgeParams } from "./../utils.js";

function getTranslate(data, scale) {
  let yCoordW = parseInt(data.yCoordW);
  let yCoordE = parseInt(data.yCoordE);
  let xCoordE = parseInt(data.xCoordE);
  let xCoordW = parseInt(data.xCoordW);

  if (Math.abs(xCoordW - xCoordE) / Math.abs(yCoordW - yCoordE) >= 0.75) {
    return {
      west: `(-${0.5 * scale}px,-${0.5 * scale}px)`,
      east: `(${0.5 * scale}px,${0.5 * scale}px)`,
    };
  } else if (yCoordW < yCoordE) {
    return {
      west: `(${0.5 * scale}px,-${0.5 * scale}px)`,
      east: `(-${0.5 * scale}px,${0.5 * scale}px)`,
    };
  } else {
    return {
      west: `(-${0.5 * scale}px,${0.5 * scale}px)`,
      east: `(${0.5 * scale}px,-${0.5 * scale}px)`,
    };
  }
}

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  data,
  selected,
  style,
}) {
  const scale = data.scale;
  const zoomLevel = useReactFlowStore((store) => store.transform[2]);
  const sourceNode = useReactFlowStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useReactFlowStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  //If animation is not enable, remove it from style
  let edgeStyle = useMemo(() => {
    // if (zoomLevel < 1.5) return { ...style, strokeDasharray: "" };
    if (data.animation) {
      return style;
    } else return { ...style, animation: "" };
  }, [data.animation, style, zoomLevel]);

  if (selected)
    edgeStyle = { ...edgeStyle, filter: "drop-shadow(0px 0px 2px white)" };

  //Check for data.Time, if it doesn't exist, check if projectedTime is enabled
  const travelTime = useMemo(() => {
    let tempTravelTime = { west: "", east: "" };
    data.timeE
      ? (tempTravelTime.east = `-> ${data.timeE}`)
      : data.projectedTime && !data.type.includes("uniW")
      ? (tempTravelTime.east = "-> " + Math.floor(data.dist / data.speed))
      : (tempTravelTime.east = "");
    data.timeW
      ? (tempTravelTime.west = `<- ${data.timeW}`)
      : data.projectedTime && !data.type.includes("uniE")
      ? (tempTravelTime.west = "<- " + Math.floor(data.dist / data.speed))
      : (tempTravelTime.west = "");

    return tempTravelTime;
  }, [
    data.dist,
    data.projectedTime,
    data.speed,
    data.timeE,
    data.timeW,
    data.type,
  ]);

  const [edgePath] = useMemo(() => {
    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
      sourceNode,
      targetNode
    );
    return getSimpleBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      targetX: tx,
      targetY: ty,
    });
  }, [sourceNode, targetNode]);

  const translate = useMemo(() => {
    return getTranslate(data, scale);
  }, [data, scale]);

  const textStyle = useMemo(() => {
    if (zoomLevel < 1.5) return { display: "none" };

    return {
      fontSize: `${0.75 * scale}px`,
      fontWeight: "bold",
      textShadow: "0 0 0.1px black, 0 0 0.1px black, 0 0 0.5px black",
      zIndex: 3,
    };
  }, [scale, zoomLevel]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={edgeStyle}
      />
      <text
        className="SPHERE__edge-text"
        style={{ transform: `translate${translate.west}` }}
      >
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
      <text
        className="SPHERE__edge-text"
        style={{ transform: `translate${translate.west}` }}
      >
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

      <text
        className="SPHERE__edge-text"
        style={{ transform: `translate${translate.east}` }}
      >
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
