import "../../../style/SideBar.css";
import PlanetCard from "./PlanetCard";

function PlanetRightSB(props) {
  const onClickSelect = props.onClickSelect;
  const scale = props.scale;
  const planets = props.planetScreenData.planets.sort(
    (a, b) => parseInt(a.orbitRadius) - parseInt(b.orbitRadius)
  );
  //console.log(planetScreenData);

  return (
    <div className="RIGHTSB">
      <div className="RIGHTSB__inner-container">
        <div className="RIGHTSB__planet-card-container">
          {planets.map((planet) => {
            return (
              <PlanetCard
                key={planet.name + planet.orbitRadius}
                planet={planet}
                scale={scale}
                onClickSelect={onClickSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlanetRightSB;
