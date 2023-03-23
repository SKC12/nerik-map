import { useState } from "react";
import "../style/SideBar.css";
import LeftSBFlows from "./LeftSBFlows";
import LeftSBSphere from "./LeftSBSphere";
import LeftSBOptions from "./LeftSBOptions";

function LeftSideBar(props) {
  const [selectedTab, setSelectedTab] = useState("sphereTab");
  const selectedNode = props.selectedNode;
  const [hideUnkownPaths] = props.unknownPathsState;

  const edges = props.edges;

  const selectedData = selectedNode ? selectedNode.data : null;

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
          <LeftSBSphere selectedData={selectedData} />
        ) : null}
        {selectedTab === "flowsTab" ? (
          <LeftSBFlows
            edges={edges}
            selectedNode={selectedNode}
            hideUnkownPaths={hideUnkownPaths}
          />
        ) : null}
        {selectedTab === "optionsTab" ? (
          <LeftSBOptions
            animationState={props.animationState}
            projectedTimeState={props.projectedTimeState}
            unknownPathsState={props.unknownPathsState}
            dragState={props.dragState}
          />
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
