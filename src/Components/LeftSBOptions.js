import { Button } from "@mui/material";
import { useCallback, useRef } from "react";
import useStore from "../store";
import { shallow } from "zustand/shallow";

function LeftSBOptions(props) {
  const isAnimated = useStore((state) => state.isAnimated);
  const toggleAnimated = useStore((state) => state.toggleAnimated);
  const projectedTime = useStore((state) => state.projectedTime);
  const toggleProjectedTime = useStore((state) => state.toggleProjectedTime);
  const draggable = useStore((state) => state.draggable);
  const toggleDraggable = useStore((state) => state.toggleDraggable);
  const hideUnknownPaths = useStore((state) => state.hideUnkownPaths);
  const toggleHideUnknownPaths = useStore(
    (state) => state.toggleHideUnknownPaths
  );
  const toggleHideUnknownSpheres = useStore(
    (state) => state.toggleHideUnknownSpheres
  );

  const reactFlowInstance = props.reactFlowInstance;
  const setEdges = useStore((state) => state.setEdges, shallow);
  const setNodes = useStore((state) => state.setNodes, shallow);

  const hiddenFileRef = useRef(null);

  // const animationChange = () => {
  //   setIsAnimated(!isAnimated);
  // };

  const unknownPathsChange = () => {
    toggleHideUnknownPaths();
    toggleHideUnknownSpheres();
  };

  const saveToLocalStorage = useCallback(() => {
    if (reactFlowInstance) {
      const data = reactFlowInstance.toObject();
      localStorage.setItem("sbej-flowmap", JSON.stringify(data));
    }
  }, [reactFlowInstance]);

  const downloadAsFile = useCallback(() => {
    if (reactFlowInstance) {
      const data = JSON.stringify(reactFlowInstance.toObject());

      const blob = new Blob([data], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "flowmap.json";
      a.click();
    }
  }, [reactFlowInstance]);

  const loadFromLocalStorage = useCallback(() => {
    const loadData = async () => {
      const data = JSON.parse(localStorage.getItem("sbej-flowmap"));
      if (data) {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
      }
    };

    loadData();
  }, [setEdges, setNodes]);

  const loadFromFile = useCallback(
    (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = JSON.parse(e.target.result);
        if (data) {
          setNodes(data.nodes || []);
          setEdges(data.edges || []);
        }
      };
      reader.readAsText(file);
    },
    [setEdges, setNodes]
  );

  return (
    <div>
      <h3>Settings:</h3>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="draggablecb"
          name="draggablecb"
          checked={draggable}
          onChange={toggleDraggable}
        ></input>
        <label className="LEFTSB__data-label">Draggable Spheres</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="animationcb"
          name="animationcb"
          checked={isAnimated}
          onChange={toggleAnimated}
        ></input>
        <label className="LEFTSB__data-label">Animated</label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="projTimecb"
          name="projTimecb"
          checked={projectedTime}
          onChange={toggleProjectedTime}
        ></input>
        <label className="LEFTSB__data-label">
          Calculate missing travel time
        </label>
      </div>
      <div className="LEFTSB__option-container">
        <input
          className="LEFTSB__option-checkbox"
          type="checkbox"
          id="unknownPathscb"
          name="unknownPathscb"
          checked={hideUnknownPaths}
          onChange={unknownPathsChange}
        ></input>
        <label className="LEFTSB__data-label">
          Hide unknown Spheres and Flows
        </label>
      </div>
      <hr></hr>
      <h3>Storage:</h3>
      <div className="LEFTSB__option-button-container">
        <Button
          className="LEFTSB__option-button"
          onClick={saveToLocalStorage}
          disableElevation
          variant="contained"
        >
          Save to local storage
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={loadFromLocalStorage}
          disableElevation
          variant="contained"
        >
          Restore from local storage
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={downloadAsFile}
          disableElevation
          variant="contained"
        >
          Download as a file
        </Button>
        <Button
          className="LEFTSB__option-button"
          onClick={(e) => {
            hiddenFileRef.current.click();
          }}
          disableElevation
          variant="contained"
        >
          Load from file
        </Button>
        <input
          ref={hiddenFileRef}
          onChange={loadFromFile}
          style={{ display: "none" }}
          type="file"
          accept=".json"
        ></input>
      </div>
    </div>
  );
}

export default LeftSBOptions;
