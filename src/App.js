import "./style/Main.css";
import LeftSideBar from "./Components/LeftSideBar";
import SphereMap from "./Components/SphereMap";
import { useEffect, useRef, useState } from "react";
import RightSideBar from "./Components/RightSideBar";

function App() {
  let bgRatio = 1.421;

  const refContainer = useRef();
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  console.log(containerDimensions);

  const [animated, setAnimated] = useState(false);
  const [projectedTime, setProjectedTime] = useState(false);
  const [hideUnknownPaths, setHideUnknownPaths] = useState(false);

  const [draggable, setDraggable] = useState(false);

  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (refContainer.current) {
      setContainerDimensions({
        width: refContainer.current.offsetHeight * bgRatio,
        height: refContainer.current.offsetHeight,
      });
    }
  }, [bgRatio]);

  return (
    <div className="App">
      <div ref={refContainer} className="main-container">
        <LeftSideBar
          animationState={[animated, setAnimated]}
          projectedTimeState={[projectedTime, setProjectedTime]}
          selectedNode={selectedNode}
          dragState={[draggable, setDraggable]}
          unknownPathsState={[hideUnknownPaths, setHideUnknownPaths]}
        />
        <SphereMap
          width={containerDimensions.width}
          height={containerDimensions.height}
          animated={animated}
          projectedTime={projectedTime}
          setSelectedNode={setSelectedNode}
          draggable={draggable}
          hideUnknownPaths={hideUnknownPaths}
        ></SphereMap>
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;
