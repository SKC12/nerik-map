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

  return (
    <div>
      <h3>Settings:</h3>
      <div className="LEFTSB__option-container">
        <input
          type="checkbox"
          id="draggablecb"
          name="draggablecb"
          checked={draggable}
          onChange={dragChange}
        ></input>
        <label>Draggable Spheres</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          type="checkbox"
          id="animationcb"
          name="animationcb"
          checked={isAnimated}
          onChange={animationChange}
        ></input>
        <label>Animated</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          type="checkbox"
          id="projTimecb"
          name="projTimecb"
          checked={projectedTime}
          onChange={projectedTimeChange}
        ></input>
        <label>Calculate missing travel time</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          type="checkbox"
          id="unknownPathscb"
          name="unknownPathscb"
          checked={hideUnkownPaths}
          onChange={unknownPathsChange}
        ></input>
        <label>Hide unknown Spheres and Flows</label>
      </div>
    </div>
  );
}

export default LeftSBOptions;
