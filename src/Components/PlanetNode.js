import "../style/Sphere.css";
import { Handle, Position } from "reactflow";
import useStore from "../store";
import { useStore as useReactFlowStore } from "reactflow";
import { useCallback, useMemo } from "react";
import airPlanet from "../img/PlanetGasGiant_02_Regular_Orange_Thumb.webp";
import firePlanet from "../img/PlanetAtmo_05_Regular_Red_Thumb.webp";
import earthPlanet from "../img/PlanetAtmo_01_Regular_BlueOrange_Thumb.webp";
import icePlanet from "../img/PlanetNoAtmo_01_Regular_BlueWhite_Thumb.webp";
import waterPlanet from "../img/PlanetGasGiant_01_Regular_Blue_Thumb.webp";
import livePlanet from "../img/PlanetAtmo_03_Regular_Green_Thumb.webp";

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

function getBackgroundImage(type) {
  console.log(type);
  if (type && type.includes("Earth")) {
    return earthPlanet;
  } else if (type && type.includes("Live")) {
    return livePlanet;
  } else if (type && type.includes("Fire")) {
    return firePlanet;
  } else if (type && type.includes("Water")) {
    return waterPlanet;
  } else if (type && type.includes("Ice")) {
    return icePlanet;
  } else if (type && type.includes("Air")) {
    return airPlanet;
  } else {
    return earthPlanet;
  }
}

export function PlanetNode({ selected, data }) {
  //console.log(data);
  const angle = useMemo(() => {
    return Math.floor(Math.random() * 360);
  }, []);

  const zoomLevel = useReactFlowStore((store) => store.transform[2]);
  //console.log(zoomLevel);
  const scale = useStore((state) => state.scale);
  const planetSize = Math.min(
    Math.max((getWidth(data.info.size) * 5) / (zoomLevel * 1), 30),
    5000
  );

  const radius = (parseInt(data.orbitRadius) * scale * 10) / 2;

  const getCoords = useCallback(() => {
    return {
      x: radius * Math.sin((Math.PI * angle) / 180),
      y: radius * Math.cos((Math.PI * angle) / 180),
    };
  }, [radius, angle]);

  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div
        className={`PLANET__node ${selected ? "PLANET__node-selected" : ""}`}
        style={{
          position: "relative",
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          backgroundImage: `url(${getBackgroundImage(data.info.type)})`,
          backgroundSize: "cover",

          borderRadius: "100%",
          textAlign: "center",
          transform: `translateX(${getCoords().x}px) translateY(${
            getCoords().y
          }px)`,
        }}
      >
        {zoomLevel > 0.04 || parseInt(data.orbitRadius) > 200 ? (
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
