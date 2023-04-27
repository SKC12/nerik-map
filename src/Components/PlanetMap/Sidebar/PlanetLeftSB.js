import { useEffect, useState } from "react";
import "../../../style/SideBar.css";

function PlanetLeftSB(props) {
  const [selectedTab, setSelectedTab] = useState("aboutTab");

  const scale = props.scale;
  const reactFlowInstance = props.reactFlowInstance;

  const handleTabClick = (e) => {
    setSelectedTab(e.target.id);
  };

  return (
    <div className="LEFTSB">
      <div className="LEFTSB__header">
        <div className="LEFTSB__logo"></div>
        <div className="LEFTSB__tabs-container"></div>
      </div>
      <div className="LEFTSB__inner-container"></div>
    </div>
  );
}

export default PlanetLeftSB;
