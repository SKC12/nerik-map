import "./style/Main.css";
import SphereMap from "./Components/SphereMap/SphereMap";
import { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loadCSVSpheres, loadCSVFlows } from "./data-loader";
import sphereData from "./data/spheres.csv";
import flowsData from "./data/flows.csv";
import planetData from "./data/planets.csv";

import useStore from "./store";
import { shallow } from "zustand/shallow";
import { Sphere } from "./models/Sphere";
import { Flow } from "./models/Flow";
import PlanetMap from "./Components/PlanetMap/PlanetMap";
import StartScreen from "./Components/StartScreen";

const scale = 5;

let baseMapHeight = 399 * scale;
let baseMapWidth = 567 * scale;

function App() {
  //width/heigth of the coordinates background
  let bgRatio = 1.421;

  const refContainer = useRef();
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const setEdges = useStore((state) => state.setEdges, shallow);
  const setNodes = useStore((state) => state.setNodes, shallow);
  const flowRiverColors = useStore((state) => state.flowRiverColors);

  const [loaded, setLoaded] = useState(false);

  const planetScreenData = useStore((state) => state.planetScreenData, shallow);

  //console.log(containerDimensions);
  //console.log(planetScreenData);

  async function loadNerikSpheres() {
    //let sphereArray = [];
    let sphereArray = await loadCSVSpheres(sphereData, planetData);

    //let flowsArray = [];
    let flowsArray = await loadCSVFlows(flowsData);

    let bgSphere = {
      id: "bg",
      type: "bgNode",
      position: { x: baseMapWidth / 2, y: baseMapHeight / 2 },
      data: { width: baseMapWidth, height: baseMapHeight },
      draggable: false,
      selectable: false,
      zIndex: -1,
    };

    setNodes(Sphere.getNodes(sphereArray, scale).concat(bgSphere));
    setEdges(Flow.getEdges(flowsArray, flowRiverColors, scale));
    setLoaded(true);
  }

  function loadFromScratch() {
    let bgSphere = {
      id: "bg",
      type: "bgNode",
      position: { x: baseMapWidth / 2, y: baseMapHeight / 2 },
      data: { width: baseMapWidth, height: baseMapHeight },
      draggable: false,
      selectable: false,
      zIndex: -1,
    };

    setNodes([bgSphere]);
    setLoaded(true);
  }

  // useEffect(() => {
  //   if (!loaded) {
  //     loadNerikSpheres(sphereData);
  //   }
  // }, [loaded, flowRiverColors, setNodes, setEdges]);

  // console.log("nodes and edges", nodes, edges);
  //console.log("LOADED", loaded);

  useEffect(() => {
    if (refContainer.current) {
      setContainerDimensions({
        width: refContainer.current.offsetHeight * bgRatio,
        height: refContainer.current.offsetHeight,
      });
    }
  }, [bgRatio]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(57, 57, 73)",
        contrastText: "rgb(213, 213, 230)",
      },
      text: {
        primary: "rgb(84, 84, 104)",
      },
    },
    typography: {
      fontFamily: ["Helvetica", "sans-serif"],
    },
  });

  //console.log(loaded && containerDimensions.width);

  return (
    <div ref={refContainer} className="App">
      <ThemeProvider theme={theme}>
        {loaded && containerDimensions.width ? (
          <div className="main-container">
            {planetScreenData === null ? (
              <SphereMap
                width={containerDimensions.width}
                height={containerDimensions.height}
              ></SphereMap>
            ) : (
              <PlanetMap
                width={containerDimensions.width}
                height={containerDimensions.height}
              />
            )}
          </div>
        ) : (
          <StartScreen
            width={containerDimensions.width}
            loadNerikSpheres={loadNerikSpheres}
            loadFromScratch={loadFromScratch}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
