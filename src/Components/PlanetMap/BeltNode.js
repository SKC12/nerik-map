import "../../style/Sphere.css";
import { Handle, Position, useReactFlow } from "reactflow";
import { useStore as useReactFlowStore } from "reactflow";

import asteroid1 from "../../img/asteroid1.webm";
import asteroid2 from "../../img/asteroid2.webm";
import asteroid3 from "../../img/asteroid3.webm";
import asteroid4 from "../../img/asteroid4.webm";

function getWidth(size) {
  switch (size) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 4;
    case "D":
      return 6;
    case "E":
      return 8;
    case "F":
      return 12;
    case "G":
      return 16;
    case "H":
      return 32;
    case "I":
      return 64;
    case "J":
      return 60;
    default:
      return 6;
  }
}

// function getBackgroundImage(type, shape) {
//   if (getShapeFromUnicode(shape) === "Cluster") return clusterPlanet;
//   if (type && type.includes("Earth")) {
//     return earthPlanet;
//   } else if (type && type.includes("Live")) {
//     return livePlanet;
//   } else if (type && type.includes("Fire")) {
//     return firePlanet;
//   } else if (type && type.includes("Water")) {
//     return waterPlanet;
//   } else if (type && type.includes("Ice")) {
//     return icePlanet;
//   } else if (type && type.includes("Air")) {
//     return airPlanet;
//   } else {
//     return earthPlanet;
//   }
// }

//Returns an array of n evenly distributed angles between 0 and 360, starting at 180

export function BeltNode({ selected, data }) {
  const { getNodes } = useReactFlow();
  const asteroidBgs = [asteroid1, asteroid2, asteroid3, asteroid4];

  const angle = data.beltAngle;
  const zoomLevel = useReactFlowStore((store) => store.transform[2]);
  const planetSize = Math.min(
    Math.max((getWidth(data.info.size) * 5) / (zoomLevel * 1), 30),
    5000
  );

  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div
        className={`PLANET__node ${selected ? "PLANET__node-selected" : ""}`}
        onClick={() => data.onClickSelect(data, getNodes())}
        style={{
          position: "relative",
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          borderRadius: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <video
          width={`${planetSize * 1}px`}
          height={`${planetSize * 1}px`}
          loop
          autoPlay
          style={{
            filter: `${
              selected ? `drop-shadow(0px 0px ${2 / zoomLevel}px white)` : ""
            }`,
          }}
        >
          <source
            type="video/webm"
            src={asteroidBgs[Math.floor(Math.random() * 4)]}
          ></source>
        </video>
        {(zoomLevel > 0.04 || parseInt(data.orbitRadius) > 200) &&
        angle === 180 ? (
          <div
            style={{
              position: "absolute",
              bottom: `-${15 / zoomLevel}px`,
              right: `50%`,
              color: "#FFFFFF",
              fontSize: `16px`,
              whiteSpace: "nowrap",
              lineHeight: "100%",
              transform: `scale(${1 / zoomLevel})`,
            }}
          >
            {data.name}
          </div>
        ) : null}
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
