import { Button } from "@mui/material";
import { useRef } from "react";
import useStore from "../store";
import "../style/Start.css";
import blankBG from "../img/blankBG.webp";
import customBG from "../img/customBG.webp";
import NerikMapBG from "../img/NerikMapBG.webp";
import updateMapBG from "../img/updateMapBG.webp";

function StartScreen(props) {
  const width = props.width;
  const loadNerikSpheres = props.loadNerikSpheres;
  const loadUpdatedSpheres = props.loadUpdatedSpheres;
  const loadFromScratch = props.loadFromScratch;
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);
  const loadFromFile = useStore((state) => state.loadFromFile);
  const hiddenFileRef = useRef(null);

  return (
    <div className="START__bg">
      <div
        className="START__option-container"
        style={{
          width: width,
        }}
      >
        <div
          className="START__option"
          style={{
            backgroundImage: `url(${NerikMapBG})`,
          }}
        >
          <Button
            onClick={loadNerikSpheres}
            className="START__button"
            disableElevation
            variant="contained"
          >
            Original Nerik's Map
          </Button>
        </div>
        <div
          className="START__option"
          style={{
            backgroundImage: `url(${updateMapBG})`,
          }}
        >
          <Button
            onClick={loadUpdatedSpheres}
            className="START__button"
            disableElevation
            variant="contained"
          >
            Updated Nerik's Map
          </Button>
        </div>
        <div
          className="START__option"
          style={{
            backgroundImage: `url(${blankBG})`,
          }}
        >
          <Button
            onClick={loadFromScratch}
            className="START__button"
            disableElevation
            variant="contained"
          >
            Start from Scratch
          </Button>
        </div>
        <div
          className="START__option"
          style={{
            backgroundImage: `url(${customBG})`,
          }}
        >
          <div className="START__button-container">
            <Button
              onClick={(e) => {
                hiddenFileRef.current.click();
              }}
              className="START__button"
              disableElevation
              variant="contained"
            >
              Load from file
            </Button>
            <input
              ref={hiddenFileRef}
              onChange={loadFromFile}
              style={{ display: "none" }}
              type="file"
              accept=".json"
            ></input>
            <Button
              onClick={loadFromLocalStorage}
              className="START__button"
              disableElevation
              variant="contained"
            >
              Load from local storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StartScreen;
