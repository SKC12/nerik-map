import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import greySphere from "../img/Grey_Sphere.webp";

export function SphereNode({ selected, data }) {
  let width =
    data.sphereRadius >= 400
      ? (data.sphereRadius * data.scale) / 600 + "px"
      : `${1 * data.scale}px`;
  let height =
    data.sphereRadius >= 400
      ? (data.sphereRadius * data.scale) / 600 + "px"
      : `${1 * data.scale}px`;
  let fontSize =
    data.sphereRadius !== "0" && data.sphereRadius > 400
      ? (data.sphereRadius * data.scale) / 3300 + "px"
      : `${1 * data.scale}px`;

  //console.log(data.shortName, data.sphereRadius, width, height, fontSize);

  let style = {
    width: width,
    height: height,
    backgroundImage: `url(${greySphere})`,
    opacity: `${data.isKnown === "yes" ? "100%" : "70%"}`,

    fontSize: fontSize,
  };

  let nameTranslateStyle = {
    transform: `translate(${
      Math.max((data.sphereRadius * data.scale) / 600, 1 * data.scale) + "px"
    },-0px)`,
    position: "absolute",
    left: "0px",
    bottom: "0px",
    fontSize: `${0.75 * data.scale}px`,
    color: "rgb(236, 236, 236)",
    textShadow:
      "0.1px 0.1px 0px black, -0.1px -0.1px 0px black,  0.1px -0.1px 0px black,  -0.1px 0.1px 0px black",
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
          className={`SPHERE__name ${
            data.sphereRadius <= 1400 ? "SPHERE__name-translated" : ""
          }`}
        >
          {data.shortName}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
