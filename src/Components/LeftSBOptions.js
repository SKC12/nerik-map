import { Button } from "@mui/material";

function LeftSBOptions(props) {
  const [isAnimated, setIsAnimated] = props.animationState;
  const [projectedTime, setProjectedTime] = props.projectedTimeState;
  const [draggable, setDraggable] = props.dragState;
  const [hideUnkownPaths, setHideUnknownPaths] = props.unknownPathsState;
  const [hideUnkownSpheres, setHideUnknownSpheres] = props.unknownSpheresState;

  const animationChange = () => {
    setIsAnimated(!isAnimated);
  };

  const projectedTimeChange = () => {
    setProjectedTime(!projectedTime);
  };

  const dragChange = () => {
    setDraggable(!draggable);
  };

  const unknownPathsChange = () => {
    setHideUnknownPaths(!hideUnkownPaths);
    setHideUnknownSpheres(!hideUnkownSpheres);
  };

  const saveToLocalStorage = () => {};

  return (
    <div>
      <h3>Settings:</h3>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="draggablecb"
          name="draggablecb"
          checked={draggable}
          onChange={dragChange}
        ></input>
        <label className="LEFTSB__data-label">Draggable Spheres</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="animationcb"
          name="animationcb"
          checked={isAnimated}
          onChange={animationChange}
        ></input>
        <label className="LEFTSB__data-label">Animated</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="projTimecb"
          name="projTimecb"
          checked={projectedTime}
          onChange={projectedTimeChange}
        ></input>
        <label className="LEFTSB__data-label">
          Calculate missing travel time
        </label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="unknownPathscb"
          name="unknownPathscb"
          checked={hideUnkownPaths}
          onChange={unknownPathsChange}
        ></input>
        <label className="LEFTSB__data-label">
          Hide unknown Spheres and Flows
        </label>
      </div>
      <hr></hr>
      <h3>Storage:</h3>
      <div className="LEFTSB__option-button-container">
        <Button
          className="LEFTSB__option-button"
          onClick={saveToLocalStorage}
          disableElevation
          variant="contained"
        >
          Save to local storage
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={saveToLocalStorage}
          disableElevation
          variant="contained"
        >
          Restore from local storage
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={saveToLocalStorage}
          disableElevation
          variant="contained"
        >
          Download as a file
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={saveToLocalStorage}
          disableElevation
          variant="contained"
        >
          Load from file
        </Button>
      </div>
    </div>
  );
}

export default LeftSBOptions;
