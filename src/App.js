import "./style/Main.css";
import SphereMap from "./Components/SphereMap/SphereMap";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loadCSVSpheres, loadCSVFlows } from "./data-loader";
import sphereData from "./data/spheres.csv";
import flowsData from "./data/flows.csv";
import planetData from "./data/planets.csv";
import newSpheresData from "./data/newSpheres.csv";
import newFlowsData from "./data/newFlows.csv";
import nerikJSON from "./data/nerikMap.json";
import updatedJSON from "./data/updatedMap.json";

import useStore from "./store";
import { shallow } from "zustand/shallow";
import { Sphere } from "./models/Sphere";
import { Flow } from "./models/Flow";
import PlanetMap from "./Components/PlanetMap/PlanetMap";
import StartScreen from "./Components/StartScreen";

const scale = 5;

let baseMapHeight = 399 * scale;
let baseMapWidth = 567 * scale;

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
  const projectedTime = useStore((state) => state.projectedTime);
  const toggleProjectedTime = useStore(
    (state) => state.toggleProjectedTime,
    shallow
  );
  const flowRiverColors = useStore((state) => state.flowRiverColors);
  const dataLoaded = useStore((state) => state.dataLoaded);
  const toggleDataLoaded = useStore((state) => state.toggleDataLoaded);
  const planetScreenData = useStore((state) => state.planetScreenData, shallow);
  const setVerticalLayout = useStore((state) => state.setVerticalLayout);

  const loadNerikSpheres = useCallback(() => {
    async function load() {
      if (nerikJSON) {
        let data = nerikJSON;
        if (data) {
          setNodes(data.nodes);
          setEdges(data.edges);
          toggleDataLoaded();
        }
      } else {
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
        toggleDataLoaded();
      }
    }

    load();
  }, [setNodes, setEdges, toggleDataLoaded, flowRiverColors]);

  const loadUpdatedSpheres = useCallback(() => {
    async function load() {
      if (updatedJSON) {
        let data = updatedJSON;
        if (data) {
          setNodes(data.nodes);
          setEdges(data.edges);
          toggleDataLoaded();
        }
      } else {
        let sphereArray = await loadCSVSpheres(sphereData, planetData);
        let newSpheresArray = await loadCSVSpheres(newSpheresData, planetData);

        let flowsArray = await loadCSVFlows(flowsData);
        let newFlowsArray = await loadCSVFlows(newFlowsData);

        let bgSphere = {
          id: "bg",
          type: "bgNode",
          position: { x: baseMapWidth / 2, y: baseMapHeight / 2 },
          data: { width: baseMapWidth, height: baseMapHeight },
          draggable: false,
          selectable: false,
          zIndex: -1,
        };

        setNodes(
          Sphere.getNodes(sphereArray, scale)
            .concat(Sphere.getNodes(newSpheresArray, scale))
            .concat(bgSphere)
        );
        setEdges(
          Flow.getEdges(flowsArray, flowRiverColors, scale).concat(
            Flow.getEdges(newFlowsArray, flowRiverColors, scale)
          )
        );
        if (!projectedTime) toggleProjectedTime();
        toggleDataLoaded();
      }
    }

    load();
  }, [
    flowRiverColors,
    projectedTime,
    setEdges,
    setNodes,
    toggleDataLoaded,
    toggleProjectedTime,
  ]);

  const loadFromScratch = useCallback(() => {
    function load() {
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
      toggleDataLoaded();
    }
    load();
  }, [setNodes, toggleDataLoaded]);

  useLayoutEffect(() => {
    if (!refContainer.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (
        refContainer.current.offsetHeight < refContainer.current.offsetWidth
      ) {
        setContainerDimensions({
          width: refContainer.current.offsetHeight * bgRatio,
          height: refContainer.current.offsetHeight,
        });
      } else {
        setContainerDimensions({
          width: refContainer.current.offsetWidth,
          height: refContainer.current.offsetHeight / 2,
        });
        setVerticalLayout(true);
      }
    });
    resizeObserver.observe(refContainer.current);
    return () => resizeObserver.disconnect();
  }, [bgRatio, setVerticalLayout]);

  return (
    <div ref={refContainer} className="App">
      <ThemeProvider theme={theme}>
        {dataLoaded && containerDimensions.width ? (
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
            loadUpdatedSpheres={loadUpdatedSpheres}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
