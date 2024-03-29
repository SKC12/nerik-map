import "../../style/Sphere.css";
import { Handle, Position } from "reactflow";
import greySphere from "../../img/Grey_Sphere.webp";

import useStore from "../../store";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";

export function SphereNode({ selected, data }) {
  const setPlanetScreenData = useStore(
    (state) => state.setPlanetScreenData,
    shallow
  );

  let width = useMemo(() => {
    if (data.sphereRadius >= 400) {
      return (data.sphereRadius * data.scale) / 600 + "px";
    } else return `${1 * data.scale}px`;
  }, [data.scale, data.sphereRadius]);

  let height = useMemo(() => {
    if (data.sphereRadius >= 400) {
      return (data.sphereRadius * data.scale) / 600 + "px";
    } else return `${1 * data.scale}px`;
  }, [data.scale, data.sphereRadius]);

  const fontSize = useMemo(() => {
    if (data.sphereRadius !== "0" && data.sphereRadius > 400) {
      return (data.sphereRadius * data.scale) / 3300 + "px";
    } else return `${1 * data.scale}px`;
  }, [data.scale, data.sphereRadius]);

  let style = useMemo(() => {
    return {
      width: width,
      height: height,
      backgroundImage: `url(${greySphere})`,
      opacity: `${data.isKnown === "yes" ? "100%" : "70%"}`,
      fontSize: fontSize,
    };
  }, [data.isKnown, fontSize, height, width]);

  let nameTranslateStyle = useMemo(() => {
    return {
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
  }, [data.scale, data.sphereRadius]);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className={`SPHERE__node ${selected ? "SPHERE__node-selected" : ""}`}
        style={style}
      >
        {selected ? (
          <div className="SPHERE__planets-icon-contaier">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="SPHERE__planets-icon"
              width={`10px`}
              height={`10px`}
              onClick={() => setPlanetScreenData(data)}
              style={{
                transform: `translate(${parseInt(width) / 3}px, -${
                  parseInt(width) / 3
                }px) scale(${parseInt(width) / 30})  `,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
          </div>
        ) : null}
        <div></div>
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
