import "../../../style/SideBar.css";
import PlanetCard from "./PlanetCard";

function PlanetRightSB(props) {
  const scale = props.scale;
  const planetScreenData = props.planetScreenData.sort(
    (a, b) => parseInt(a.orbitRadius) - parseInt(b.orbitRadius)
  );
  //console.log(planetScreenData);

  return (
    <div className="RIGHTSB">
      <div className="RIGHTSB__inner-container">
        <div className="RIGHTSB__planet-card-container">
          {planetScreenData.map((planet) => {
            return (
              <PlanetCard
                key={planet.name + planet.orbitRadius}
                planet={planet}
                scale={scale}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlanetRightSB;
