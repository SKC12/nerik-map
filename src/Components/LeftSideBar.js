import "../style/LeftSideBar.css";

function LeftSideBar(props) {
  const [isAnimated, setIsAnimated] = props.animationState;

  const animationChange = () => {
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="LEFTSB">
      <div className="LEFTSB__Header"></div>
      <div className="LEFTSB__InnerContainer">
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
