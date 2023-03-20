import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import greySphere from "../img/Grey_Sphere.webp";

export function SphereNode({ selected, data }) {
  let width = data.sphereRadius >= 400 ? data.sphereRadius / 600 + "px" : "1px";
  let height =
    data.sphereRadius >= 400 ? data.sphereRadius / 600 + "px" : "1px";
  let fontSize =
    data.sphereRadius !== "0" && data.sphereRadius > 400
      ? data.sphereRadius / 3300 + "px"
      : "1px";

  //console.log(data.shortName, data.sphereRadius, width, height, fontSize);

  let style = {
    width: width,
    height: height,
    backgroundImage: `url(${greySphere})`,

    fontSize: fontSize,
  };

  let nameTranslateStyle = {
    transform: `translate(${data.sphereRadius / 600 + 0.5 + "px"},-0px)`,
    position: "absolute",
    left: "0px",
    bottom: "0px",
    fontSize: "0.5px",
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className={`SPHERE__node ${selected ? "SPHERE__node-selected" : ""}`}
        style={style}
      >
        <div
          style={data.sphereRadius <= 1400 ? nameTranslateStyle : {}}
          className="SPHERE__name"
        >
          {data.shortName}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
