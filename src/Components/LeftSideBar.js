import { useState } from "react";
import "../style/SideBar.css";
import { getConnectedEdges, getIncomers, getOutgoers } from "reactflow";

function LeftSideBar(props) {
  const [isAnimated, setIsAnimated] = props.animationState;
  const [projectedTime, setProjectedTime] = props.projectedTimeState;
  const [selectedTab, setSelectedTab] = useState("sphereTab");
  const selectedNode = props.selectedNode;
  const [draggable, setDraggable] = props.dragState;
  const [hideUnkownPaths, setHideUnknownPaths] = props.unknownPathsState;

  const nodes = props.nodes;
  const edges = props.edges;

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

  // if (selectedNode) {
  //   console.log(selectedNode, getConnectedEdges([selectedNode], edges));
  //   console.log(selectedNode, getIncomers(selectedNode, nodes, edges));
  //   console.log(selectedNode, getOutgoers(selectedNode, nodes, edges));
  // }

  const getFlowsJSX = (node) => {
    let connectedEdges = getConnectedEdges([node], edges).map((edge) => {
      if (!hideUnkownPaths || edge.data.isKnown === "yes") {
        if (edge.source !== node.id && edge.data.type !== "uniW") {
          return (
            <>
              <div key={edge.id} className="LEFTSB__flow-container">
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-main-label">
                    &#8226; {edge.source}
                  </label>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow River:</label>

                  <p className="LEFTSB__flow-data">{edge.data.flowRiver}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow known?</label>

                  <p className="LEFTSB__flow-data">{edge.data.isKnown}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow speed:</label>

                  <p className="LEFTSB__flow-data">{edge.data.speed}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">
                    Time to destination:
                  </label>

                  <p className="LEFTSB__flow-data">
                    {edge.data.timeW + " days"}
                  </p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        } else if (edge.source === node.id && edge.data.type !== "uniE") {
          return (
            <>
              <div key={edge.id} className="LEFTSB__flow-container">
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-main-label">
                    &#8226; {edge.target}
                  </label>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow River:</label>

                  <p className="LEFTSB__flow-data">{edge.data.flowRiver}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow known?</label>

                  <p className="LEFTSB__flow-data">{edge.data.isKnown}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">Flow speed:</label>

                  <p className="LEFTSB__flow-data">{edge.data.speed}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">
                    Time to destination:
                  </label>
                  <p className="LEFTSB__flow-data">{edge.data.timeE} days</p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        } else return null;
      } else return null;
    });

    return <div className="LEFTSB__flows-container">{connectedEdges}</div>;
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
            id="sphereTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "sphereTab"
                ? "LEFTSB_selected-tab"
                : "LEFTSB__tab"
            }`}
          >
            Sphere
          </div>
          <div
            id="flowsTab"
            onClick={handleTabClick}
            className={`${
              selectedTab === "flowsTab" ? "LEFTSB_selected-tab" : "LEFTSB__tab"
            }`}
          >
            Flows
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
        {selectedTab === "sphereTab" ? (
          <div className="LEFTSB__data-container">
            <label className="LEFTSB__data-label">Name:</label>
            <p className="LEFTSB__data">{selectedData.sphere}</p>
            <label className="LEFTSB__data-label">
              Sphere Radius (Million Miles):
            </label>
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
        {selectedTab === "flowsTab"
          ? selectedNode
            ? getFlowsJSX(selectedNode)
            : null
          : null}
        {selectedTab === "optionsTab" ? (
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
              <label>Hide unknown flow rivers</label>
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
