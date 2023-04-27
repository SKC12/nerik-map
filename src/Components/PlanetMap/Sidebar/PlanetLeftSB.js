import { useEffect, useState } from "react";
import "../../../style/SideBar.css";
import PlanetInfoSB from "./PlanetInfoSB";
import PlanetNewSB from "./PlanetNewSB";
import PlanetOptionsSB from "./PlanetOptionsSB";

function PlanetLeftSB(props) {
  const [selectedTab, setSelectedTab] = useState("aboutTab");
  const selectedNode = props.selectedNode;
  const [nodes, setNodes] = props.nodeState;

  const scale = props.scale;
  const reactFlowInstance = props.reactFlowInstance;

  useEffect(() => {
    selectedNode ? setSelectedTab("planetTab") : setSelectedTab("newTab");
  }, [selectedNode]);

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
                  selectedTab === "planetTab"
                    ? "LEFTSB_selected-tab"
                    : "LEFTSB__tab"
                }`}
              >
                Planet
              </div>
            </>
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
        {selectedTab === "planetTab" ? (
          <PlanetInfoSB
            selectedNode={selectedNode}
            reactFlowInstance={reactFlowInstance}
            nodeState={[nodes, setNodes]}
          />
        ) : null}

        {selectedTab === "newTab" ? <PlanetNewSB scale={scale} /> : null}
        {selectedTab === "optionsTab" ? (
          <PlanetOptionsSB reactFlowInstance={reactFlowInstance} />
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

export default PlanetLeftSB;
