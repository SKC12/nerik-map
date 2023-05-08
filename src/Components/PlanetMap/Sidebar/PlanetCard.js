import "../../../style/SideBar.css";
import airPlanet from "../../../img/air.webm";
import firePlanet from "../../../img/fire.webm";
import earthPlanet from "../../../img/earth.webm";
import icePlanet from "../../../img/ice.webm";
import waterPlanet from "../../../img/water.webm";
import livePlanet from "../../../img/live.webm";
import clusterPlanet from "../../../img/cluster.webm";
import { useReactFlow } from "reactflow";
import { getCoords } from "../../utils";
import { getShapeFromUnicode } from "../../utils";

function getBackgroundImage(type, shape) {
  if (getShapeFromUnicode(shape) === "Cluster") return clusterPlanet;

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
  const { setCenter } = useReactFlow();
  const onClickSelect = props.onClickSelect;

  const scale = props.scale;
  const planet = props.planet;
  const coords = getCoords(
    (parseInt(planet.orbitRadius) * scale * 10) / 2,
    planet.info.angle
  );
  return (
    <div
      className="RIGHTSB__planet-card"
      onClick={(e) => {
        onClickSelect(planet);
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
        <video width={"60px"} loop autoPlay>
          <source
            type="video/webm"
            src={getBackgroundImage(planet.info.type, planet.info.shape)}
          ></source>
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
