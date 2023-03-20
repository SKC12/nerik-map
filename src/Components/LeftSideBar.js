import { useState } from "react";
import "../style/LeftSideBar.css";

function LeftSideBar(props) {
  const [isAnimated, setIsAnimated] = props.animationState;
  const [projectedTime, setProjectedTime] = props.projectedTimeState;
  const [selectedTab, setSelectedTab] = useState("dataTab");
  const selectedNode = props.selectedNode;
  const [draggable, setDraggable] = props.dragState;
  const [hideUnkownPaths, setHideUnknownPaths] = props.unknownPathsState;

  const selectedData = selectedNode
    ? selectedNode.data
    : {
        sphere: "",
        sphereRadius: "",
        region: "",
        flowRiver: "",
        population: "",
        activityLeve: "",
        controlledBy: "",
        description: "",
        source: "",
        creator: "",
        website: "",
      };

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
  };

  const handleTabClick = (e) => {
    setSelectedTab(e.target.id);
  };

  return (
    <div className="LEFTSB">
      <div className="LEFTSB__header">
        <div className="LEFTSB__logo"></div>
        <div className="LEFTSB__tabs-container">
          <div
            id="dataTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "dataTab" ? "LEFTSB_selected-tab" : "LEFTSB__tab"
            }`}
          >
            Data
          </div>
          <div
            id="editTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "editTab" ? "LEFTSB_selected-tab" : "LEFTSB__tab"
            }`}
          >
            Edit
          </div>
          <div
            id="optionsTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "optionsTab"
                ? "LEFTSB_selected-tab"
                : "LEFTSB__tab"
            }`}
          >
            Options
          </div>
          <div
            id="aboutTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "aboutTab" ? "LEFTSB_selected-tab" : "LEFTSB__tab"
            }`}
          >
            About
          </div>
        </div>
      </div>
      <div className="LEFTSB__inner-container">
        {selectedTab === "dataTab" ? (
          <div className="LEFTSB__data-container">
            <label className="LEFTSB__data-label">Name:</label>
            <p className="LEFTSB__data">{selectedData.sphere}</p>
            <label className="LEFTSB__data-label">Sphere Radius:</label>
            <p className="LEFTSB__data">{selectedData.sphereRadius}</p>
            <label className="LEFTSB__data-label">Region:</label>
            <p className="LEFTSB__data">{selectedData.region}</p>
            <label className="LEFTSB__data-label">Flow River:</label>
            <p className="LEFTSB__data">{selectedData.flowRiver}</p>
            <label className="LEFTSB__data-label">Population:</label>
            <p className="LEFTSB__data">{selectedData.population}</p>
            <label className="LEFTSB__data-label">Activity Level:</label>
            <p className="LEFTSB__data">{selectedData.activity}</p>
            <label className="LEFTSB__data-label">Controlled by:</label>
            <p className="LEFTSB__data">{selectedData.controlled}</p>
            <label className="LEFTSB__data-label">Description:</label>
            <p className="LEFTSB__data">{selectedData.description}</p>
            <label className="LEFTSB__data-label">Source:</label>
            <p className="LEFTSB__data">{selectedData.source}</p>
            <label className="LEFTSB__data-label">Creator:</label>
            <p className="LEFTSB__data">{selectedData.creator}</p>
            <label className="LEFTSB__data-label">Website:</label>
            <a
              href={selectedData.website}
              className="LEFTSB__data LEFTSB__data-link"
            >
              {selectedData.website}
            </a>
          </div>
        ) : null}
        {selectedTab === "editTab" ? (
          <div className="LEFTSB__data-container">
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
          </div>
        ) : null}
        {selectedTab === "optionsTab" ? (
          <div>
            <h3>Settings:</h3>
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
              <label>Hide unknown flow river</label>
            </div>
          </div>
        ) : null}
        {selectedTab === "aboutTab" ? (
          <div>
            <h2>Settings:</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LeftSideBar;
