import { useEffect, useState } from "react";
import "../../../style/SideBar.css";
import LeftSBFlows from "./LeftSBFlows";
import LeftSBSphere from "./LeftSBSphere";
import LeftSBOptions from "./LeftSBOptions";
import LeftSBFlow from "./LeftSBFlow";
import LeftSBNew from "./LeftSBNew";
function LeftSideBar(props) {
  const [selectedTab, setSelectedTab] = useState("aboutTab");
  const [selectedNode, setSelectedNode] = [
    props.selectedNode,
    props.setSelectedNode,
  ];
  const [selectedEdge, setSelectedEdge] = [
    props.selectedEdge,
    props.setSelectedEdge,
  ];

  const scale = props.scale;
  const reactFlowInstance = props.reactFlowInstance;

  useEffect(() => {
    selectedNode
      ? setSelectedTab("sphereTab")
      : selectedEdge
      ? setSelectedTab("flowTab")
      : setSelectedTab("newTab");
  }, [selectedNode, selectedEdge]);

  const handleTabClick = (e) => {
    setSelectedTab(e.target.id);
  };

  return (
    <div className="LEFTSB">
      <div className="LEFTSB__header">
        <div className="LEFTSB__logo"></div>
        <div className="LEFTSB__tabs-container">
          {selectedNode ? (
            <>
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
                  selectedTab === "flowsTab"
                    ? "LEFTSB_selected-tab"
                    : "LEFTSB__tab"
                }`}
              >
                Flows
              </div>
            </>
          ) : selectedEdge ? (
            <div
              id="flowTab"
              onClick={handleTabClick}
              className={`${
                selectedTab === "flowTab"
                  ? "LEFTSB_selected-tab"
                  : "LEFTSB__tab"
              }`}
            >
              Flow
            </div>
          ) : (
            <div
              id="newTab"
              onClick={handleTabClick}
              className={`${
                selectedTab === "newTab" ? "LEFTSB_selected-tab" : "LEFTSB__tab"
              }`}
            >
              New
            </div>
          )}

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
          <LeftSBSphere
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            reactFlowInstance={reactFlowInstance}
          />
        ) : null}
        {selectedTab === "flowsTab" ? (
          <LeftSBFlows selectedNode={selectedNode} />
        ) : null}
        {selectedTab === "flowTab" ? (
          <LeftSBFlow
            selectedEdge={selectedEdge}
            setSelectedEdge={setSelectedEdge}
            reactFlowInstance={reactFlowInstance}
          />
        ) : null}
        {selectedTab === "newTab" ? <LeftSBNew scale={scale} /> : null}
        {selectedTab === "optionsTab" ? (
          <LeftSBOptions reactFlowInstance={reactFlowInstance} />
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
