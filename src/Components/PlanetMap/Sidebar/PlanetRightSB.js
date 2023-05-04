import { useState } from "react";
import useStore from "../../../store";
import "../../../style/SideBar.css";
import PlanetCard from "./PlanetCard";

function PlanetRightSB(props) {
  const verticalLayout = useStore((state) => state.verticalLayout);
  const [open, setOpen] = useState(!verticalLayout);
  const onClickSelect = props.onClickSelect;
  const scale = props.scale;
  const planets = props.planetScreenData.planets.sort(
    (a, b) => parseInt(a.orbitRadius) - parseInt(b.orbitRadius)
  );

  return (
    <div
      className="RIGHTSB"
      style={{
        transform: `${open ? "" : "translate(320px)"}`,
      }}
    >
      <div className="RIGHTSB__open-tab" onClick={() => setOpen(!open)}>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-double-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-double-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
            <path
              fillRule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        )}
      </div>
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
