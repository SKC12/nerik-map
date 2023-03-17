import "./style/Main.css";
import LeftSideBar from "./Components/LeftSideBar";
import SphereMap from "./Components/SphereMap";
import { useEffect, useRef, useState } from "react";

function App() {
  let bgRatio = 1.421;

  const refContainer = useRef();
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [animated, setAnimated] = useState(false);
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
          selectedNode={selectedNode}
        />
        <SphereMap
          width={containerDimensions.width}
          height={containerDimensions.height}
          animated={animated}
          setSelectedNode={setSelectedNode}
        ></SphereMap>
      </div>
    </div>
  );
}

export default App;
