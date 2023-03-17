import "./style/Main.css";
import Header from "./Components/Header";
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
      <Header />
      <div ref={refContainer} className="main-container">
        <LeftSideBar />
        <SphereMap
          width={containerDimensions.width}
          height={containerDimensions.height}
        ></SphereMap>
      </div>
    </div>
  );
}

export default App;
