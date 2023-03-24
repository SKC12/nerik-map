import "./style/Main.css";
import SphereMap from "./Components/SphereMap";
import { useEffect, useRef, useState } from "react";

function App() {
  let bgRatio = 1.421;

  const refContainer = useRef();
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  //console.log(containerDimensions);

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
        <SphereMap
          width={containerDimensions.width}
          height={containerDimensions.height}
        ></SphereMap>
      </div>
    </div>
  );
}

export default App;
