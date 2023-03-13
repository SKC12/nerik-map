import "../style/Sphere.css";
import { Handle, Position } from "reactflow";

export function SphereNode({ data }) {
  let width =
    data.sphereRadius !== "0" ? data.sphereRadius / 600 + "px" : "1px";
  let height =
    data.sphereRadius !== "0" ? data.sphereRadius / 600 + "px" : "1px";
  let fontSize =
    data.sphereRadius !== "0" && data.sphereRadius > 3000
      ? data.sphereRadius / 3000 + "px"
      : "1px";

  //console.log(data.sphereRadius, width, height, fontSize);

  //console.log(width);
  let style = {
    width: width,
    height: height,

    fontSize: fontSize,
  };
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="SPHERE_node" style={style}>
        <div className="SPHERE_name">{data.shortName}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
