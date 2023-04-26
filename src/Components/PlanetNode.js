import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import useStore from "../store";
import { useStore as useReactFlowStore } from "reactflow";
import { useMemo } from "react";

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

export function PlanetNode({ selected, data }) {
  console.log(data);
  const angle = useMemo(() => {
    return Math.floor(Math.random() * 360);
  }, []);
  const zoomLevel = useReactFlowStore((store) => store.transform[2]);
  //console.log(zoomLevel);
  const scale = useStore((state) => state.scale);
  const planetSize = Math.min(
    Math.max((getWidth(data.info.size) * 5) / (zoomLevel * 1), 10),
    5000
  );

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="PLANET__orbit"
        style={{
          width: `${parseInt(data.orbitRadius) * scale * 10 || 1}px`,
          height: `${parseInt(data.orbitRadius) * scale * 10 || 1}px`,
          borderRadius: "100%",
          // border: "1px solid black",
          position: "relative",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          className={`PLANET__node ${selected ? "PLANET__node-selected" : ""}`}
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            position: "absolute",
            top: `${-planetSize / 2}px`,
            left: `${
              (parseInt(data.orbitRadius) * scale * 10) / 2 - planetSize / 2
            }px`,
            backgroundColor: "red",
            borderRadius: "100%",
            textAlign: "center",
          }}
        >
          {zoomLevel > 0.04 || parseInt(data.orbitRadius) > 200 ? (
            <div
              style={{
                display: "inline-block",
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: `${20 / zoomLevel}px`,
                whiteSpace: "nowrap",
                transform: `translateX(-50%) translateY(-50%) rotate(-${angle}deg) translateY(${
                  planetSize / 1.2
                }px)`,
              }}
            >
              {data.name}
            </div>
          ) : null}
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
