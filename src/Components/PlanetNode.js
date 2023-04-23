import "../style/Sphere.css";
import { Handle, Position } from "reactflow";

export function PlanetNode({ selected, data }) {
  console.log(data);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="PLANET__orbit"
        style={{
          width: `${parseInt(data.orbitRadius)}px`,
          height: `${parseInt(data.orbitRadius)}px`,
          borderRadius: "100%",
          //   border: "1px solid black",
        }}
      >
        <div
          className={`PLANET__node ${selected ? "PLANET__node-selected" : ""}`}
          //   style={{width:10}}
        ></div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
