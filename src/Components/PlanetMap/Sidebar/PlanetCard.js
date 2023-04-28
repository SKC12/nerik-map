import "../../../style/SideBar.css";
import airPlanet from "../../../img/air.webm";
import firePlanet from "../../../img/fire.webm";
import earthPlanet from "../../../img/earth.webm";
import icePlanet from "../../../img/ice.webm";
import waterPlanet from "../../../img/water.webm";
import livePlanet from "../../../img/live.webm";

function getBackgroundImage(type) {
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
  const planet = props.planet;
  return (
    <div className="RIGHTSB__planet-card">
      <div className="RIGHTSB__planet-card-img-container">
        <video width={"60px"} loop autoPlay>
          <source
            type="video/webm"
            src={getBackgroundImage(planet.info.type)}
          ></source>
        </video>
      </div>
      <div className="RIGHTSB__planet-card-data-container">
        <p className="RIGHTSB__planet-card-name">{planet.name}</p>

        <div className="RIGHTSB__planet-card-info-container">
          <p className="RIGHTSB__planet-card-data">{planet.info.size}</p>
          <p className="RIGHTSB__planet-card-data">{planet.info.type}</p>
          <p className="RIGHTSB__planet-card-data">
            {planet.info.orbitRadius}M mi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlanetCard;