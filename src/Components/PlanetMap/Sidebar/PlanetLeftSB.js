import { useEffect, useState } from "react";
import "../../../style/SideBar.css";
import PlanetInfoSB from "./PlanetInfoSB";
import PlanetNewSB from "./PlanetNewSB";
import logo from "../../../img/SBEJ.png";

function PlanetLeftSB(props) {
  const [selectedTab, setSelectedTab] = useState("aboutTab");
  const selectedNode = props.selectedNode;
  const [nodes, setNodes] = props.nodeState;
  const planetScreenData = props.planetScreenData;

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
        <div className="LEFTSB__logo-container">
          <div className="LEFTSB__img-container">
            <img className="LEFTSB__logo" src={logo} alt="logo"></img>
          </div>
          <div className="LEFTSB__title-container">
            <p>The Incomplete</p>
            <p>Map of the spheres</p>
          </div>
        </div>
        <div className="LEFTSB__tabs-container">
          {selectedNode ? (
            <>
              <div
                id="planetTab"
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
            scale={scale}
          />
        ) : null}

        {selectedTab === "newTab" ? (
          <PlanetNewSB
            selectedNode={selectedNode}
            reactFlowInstance={reactFlowInstance}
            nodeState={[nodes, setNodes]}
            scale={scale}
            planetScreenData={planetScreenData}
          />
        ) : null}
        {selectedTab === "aboutTab" ? (
          <div>
            <div className="SB__about">
              <p>
                This project is an attempt to recreate the popular Unofficial
                Map of the Flow created by Charles "Nerik" Taylor for
                Spelljammer, found
                <a href="https://nerik.orpheusweb.co.uk/">here</a>. It is an
                amazing contribution to the hobby that connects a huge number of
                official and unofficial worlds through the phlogiston. From
                Forgotten Realms, to Golarion, to a vastitude of small little
                worlds created by the community during the era of mailing lists.
              </p>
              <p>
                Unfortunately, a big portion of the information contained on
                this map has been lost in time. Expect some broken links and
                some worlds with little or no data at all.
              </p>
              <p>
                Special thanks to TSR, WotC, and every single creator that
                contributed to this hobby and allowed the creation of something
                like this.
              </p>
              <p>
                A shout-out to <a href="https://jb2a.com">JB2A</a>, the source
                of the Crystal Sphere and Planet images used in this website,
                shared under a CC-BY-NC-SA license. Can't recommend them enough
                as a source of animations for VTTs.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PlanetLeftSB;
