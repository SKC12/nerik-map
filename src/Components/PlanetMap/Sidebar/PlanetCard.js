import "../../../style/SideBar.css";
import airPlanet from "../../../img/air.webm";
import firePlanet from "../../../img/fire.webm";
import earthPlanet from "../../../img/earth.webm";
import icePlanet from "../../../img/ice.webm";
import waterPlanet from "../../../img/water.webm";
import livePlanet from "../../../img/live.webm";
import clusterPlanet from "../../../img/cluster.webm";
import asteroidRing from "../../../img/asteroidRing.webm";

import { useReactFlow } from "reactflow";
import { getCoords } from "../../utils";
import { getShapeFromUnicode } from "../../utils";
import { useEffect, useRef, useState } from "react";

function getBackgroundImage(type, shape) {
  if (getShapeFromUnicode(shape) === "Cluster") return clusterPlanet;
  if (getShapeFromUnicode(shape) === "Belt") return asteroidRing;

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

function PlanetCard(props) {
  const { setCenter, getNodes } = useReactFlow();
  const onClickSelect = props.onClickSelect;

  const scale = props.scale;
  const planet = props.planet;
  const [bgImage, setBgImage] = useState(
    getBackgroundImage(planet.info.type, planet.info.shape)
  );
  const videoRef = useRef(null);

  useEffect(() => {
    setBgImage(getBackgroundImage(planet.info.type, planet.info.shape));
    videoRef.current?.load();
  }, [planet.info.shape, planet.info.type]);

  const coords =
    getShapeFromUnicode(planet.info.shape) === "Belt"
      ? getCoords((parseInt(planet.orbitRadius) * scale * 10) / 2, 180)
      : getCoords(
          (parseInt(planet.orbitRadius) * scale * 10) / 2,
          planet.info.angle
        );
  return (
    <div
      className="RIGHTSB__planet-card"
      onClick={(e) => {
        onClickSelect(planet, getNodes());
        setCenter(
          coords.x,
          coords.y,
          parseInt(planet.orbitRadius) > 200
            ? { duration: 2000, zoom: 0.1 }
            : { duration: 2000 }
        );
      }}
    >
      <div className="RIGHTSB__planet-card-img-container">
        <video ref={videoRef} width={"60px"} loop autoPlay>
          <source type="video/webm" src={bgImage}></source>
        </video>
      </div>
      <div className="RIGHTSB__planet-card-data-container">
        <p className="RIGHTSB__planet-card-name">{planet.name}</p>

        <div className="RIGHTSB__planet-card-info-container">
          <p className="RIGHTSB__planet-card-data">{planet.info.type}</p>
          <p className="RIGHTSB__planet-card-data">Size {planet.info.size}</p>
          <p className="RIGHTSB__planet-card-data">
            {parseInt(planet.orbitRadius)}M mi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlanetCard;
