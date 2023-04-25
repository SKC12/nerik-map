import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import useStore from "../store";
import { useStore as useReactFlowStore } from "reactflow";

export function PlanetNode({ selected, data }) {
  //console.log(data);
  const zoomLevel = useReactFlowStore((store) => store.transform[2]);
  //console.log(zoomLevel);
  const scale = useStore((state) => state.scale);
  const planetSize = 30 / zoomLevel;
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="PLANET__orbit"
        style={{
          width: `${parseInt(data.orbitRadius) * scale || 1}px`,
          height: `${parseInt(data.orbitRadius) * scale || 1}px`,
          borderRadius: "100%",
          // border: "1px solid black",
          position: "relative",
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
              (parseInt(data.orbitRadius) * scale) / 2 - planetSize / 2
            }px`,
            backgroundColor: "red",
            borderRadius: "100%",
          }}
        ></div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
