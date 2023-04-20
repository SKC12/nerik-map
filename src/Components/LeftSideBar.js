import { useEffect, useState } from "react";
import "../style/SideBar.css";
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
  const [hideUnkownPaths] = props.unknownPathsState;

  const setNodes = props.setNodes;
  const setEdges = props.setEdges;

  const edges = props.edges;
  const nodes = props.nodes;

  const scale = props.scale;
  const reactFlowInstance = props.reactFlowInstance;
  const flowRiverColors = props.flowRiverColors;
  const setFlowRiverColors = props.setFlowRiverColors;

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
            setNodes={setNodes}
            reactFlowInstance={reactFlowInstance}
          />
        ) : null}
        {selectedTab === "flowsTab" ? (
          <LeftSBFlows
            edges={edges}
            selectedNode={selectedNode}
            hideUnkownPaths={hideUnkownPaths}
            setEdges={setEdges}
          />
        ) : null}
        {selectedTab === "flowTab" ? (
          <LeftSBFlow
            selectedEdge={selectedEdge}
            setSelectedEdge={setSelectedEdge}
            setEdges={setEdges}
            edges={edges}
            nodes={nodes}
            reactFlowInstance={reactFlowInstance}
            flowRiverColors={flowRiverColors}
            setFlowRiverColors={setFlowRiverColors}
          />
        ) : null}
        {selectedTab === "newTab" ? (
          <LeftSBNew
            edges={edges}
            nodes={nodes}
            setEdges={setEdges}
            scale={scale}
            flowRiverColors={flowRiverColors}
            setFlowRiverColors={setFlowRiverColors}
          />
        ) : null}
        {selectedTab === "optionsTab" ? (
          <LeftSBOptions
            animationState={props.animationState}
            projectedTimeState={props.projectedTimeState}
            unknownPathsState={props.unknownPathsState}
            unknownSpheresState={props.unknownSpheresState}
            dragState={props.dragState}
            reactFlowInstance={reactFlowInstance}
            setEdges={setEdges}
            setNodes={setNodes}
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
