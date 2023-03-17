import { useState } from "react";
import "../style/LeftSideBar.css";

function LeftSideBar(props) {
  const [isAnimated, setIsAnimated] = props.animationState;
  const [selectedTab, setSelectedTab] = useState("dataTab");

  const animationChange = () => {
    setIsAnimated(!isAnimated);
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
        </div>
      </div>
      <div className="LEFTSB__inner-container">
        <h2>Settings:</h2>
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
      </div>
    </div>
  );
}

export default LeftSideBar;
