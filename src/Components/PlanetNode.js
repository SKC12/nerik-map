import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import useStore from "../store";

export function PlanetNode({ selected, data }) {
  console.log(data);
  const scale = useStore((state) => state.scale);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="PLANET__orbit"
        style={{
          width: `${parseInt(data.orbitRadius) * scale}px`,
          height: `${parseInt(data.orbitRadius) * scale}px`,
          borderRadius: "100%",
          // border: "1px solid black",
          position: "relative",
        }}
      >
        <div
          className={`PLANET__node ${selected ? "PLANET__node-selected" : ""}`}
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            top: "-5px",
            left: `${(parseInt(data.orbitRadius) * scale) / 2 - 5}px`,
            backgroundColor: "red",
            // borderRadius: "100%",
          }}
        ></div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
