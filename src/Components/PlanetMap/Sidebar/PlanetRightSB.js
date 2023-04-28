import "../../../style/SideBar.css";
import PlanetCard from "./PlanetCard";

function PlanetRightSB(props) {
  const scale = props.scale;
  const planetScreenData = props.planetScreenData;

  return (
    <div className="RIGHTSB">
      <div className="RIGHTSB__inner-container">
        <div className="RIGHTSB__planet-card-container">
          {planetScreenData.map((planet) => {
            return <PlanetCard planet={planet} scale={scale} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PlanetRightSB;
