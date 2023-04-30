import { Button } from "@mui/material";
import { useCallback, useRef } from "react";
import useStore from "../../../store";
import { shallow } from "zustand/shallow";
import { toPng, toBlob, toCanvas } from "html-to-image";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

function LeftSBOptions(props) {
  const reactFlowInstance = props.reactFlowInstance;

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

  const reactFlowRef = props.reactFlowRef;

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

  // const downloadAsImage = useCallback(() => {
  //   const exportAsImage = async (element) => {
  //     const canvas = await html2canvas(element, {
  //       scale: 3,
  //       ignoreElements: (element) => {
  //         if (!element.classList.contains("react-flow__edge")) {
  //           console.log(element);
  //           return true;
  //         }
  //       },
  //     });
  //     console.log(canvas);
  //     const data = canvas.toDataURL("image/png", 1.0);
  //     const a = document.createElement("a");
  //     a.href = data;
  //     a.download = "flowmap.png";
  //     a.click();
  //   };

  //   if (reactFlowInstance) {
  //     //const element = reactFlowRef.current;
  //     const element = document.querySelector(".react-flow");
  //     exportAsImage(element);
  //   }
  // }, [reactFlowInstance]);

  // const downloadAsImage = useCallback(() => {
  //   if (reactFlowInstance) {
  //     //const element = document.querySelector(".react-flow");
  //     const element = reactFlowRef.current;
  //     toPng(element, {
  //       filter: (node) => {
  //         console.log(node);
  //         if (node?.classList?.contains("react-flow__edge")) {
  //           console.log(node);
  //           return false;
  //         }
  //         return true;
  //       },
  //     })
  //       .then((dataUrl) => {
  //         //console.log(dataUrl);
  //         const a = document.createElement("a");
  //         a.href = dataUrl;
  //         a.download = "flowmap.png";
  //         a.click();
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // }, [reactFlowInstance, reactFlowRef]);

  // const downloadAsImage = useCallback(() => {
  //   const element = reactFlowRef.current;

  //   const getImage = async () => {
  //     console.log("loading images");
  //     let edgesImage = await toPng(element, {
  //       pixelRatio: 4,
  //       filter: (node) => {
  //         //console.log(node);
  //         if (node?.classList?.contains("react-flow__edge")) {
  //           //console.log(node);
  //           return false;
  //         }
  //         return true;
  //       },
  //     });

  //     let nodesImage = await toPng(element, {
  //       pixelRatio: 4,

  //       filter: (node) => {
  //         //console.log(node);
  //         if (node?.classList?.contains("react-flow__nodes")) {
  //           //console.log(node);
  //           return false;
  //         }
  //         return true;
  //       },
  //     });
  //     console.log("loaded images", edgesImage, nodesImage);

  //     let canvas = document.createElement("canvas");
  //     canvas.width = 5975;
  //     canvas.height = 4205;

  //     let img1 = new Image();
  //     img1.src = edgesImage;

  //     img1.onload = () => {
  //       console.log("img1 load");
  //       canvas.getContext("2d").drawImage(img1, 0, 0);
  //     };
  //     let img2 = new Image();
  //     img2.src = nodesImage;
  //     img2.onLoad = () => {
  //       console.log("img2 load");

  //       console.log("created images", img1, img2);

  //       canvas.getContext("2d").drawImage(img2, 0, 0);

  //       var combined = new Image();
  //       combined.src = canvas.toDataURL();
  //       combined.onLoad = () => {
  //         console.log("combined image", combined);

  //         const a = document.createElement("a");
  //         a.href = canvas.toDataURL();
  //         a.download = "flowmap.png";
  //         a.click();
  //       };
  //     };

  //     //return { edgesBlob: edgesImage, nodesBlob: nodesImage };
  //   };

  const downloadAsImage = useCallback(() => {
    const element = reactFlowRef.current;

    const getImage = async () => {
      console.log("loading images");
      let edgesCanvas = await toCanvas(element, {
        pixelRatio: 6,
        filter: (node) => {
          //console.log(node);
          if (node?.classList?.contains("react-flow__edge")) {
            //console.log(node);
            return false;
          }
          return true;
        },
      });

      let nodesCanvas = await toCanvas(element, {
        pixelRatio: 6,

        filter: (node) => {
          //console.log(node);
          if (node?.classList?.contains("react-flow__nodes")) {
            //console.log(node);
            return false;
          }
          return true;
        },
      });

      console.log("loaded images", edgesCanvas, nodesCanvas);

      edgesCanvas.getContext("2d").drawImage(nodesCanvas, 0, 0);

      console.log("combined image");

      const a = document.createElement("a");
      a.href = edgesCanvas.toDataURL();
      a.download = "flowmap.png";
      a.click();

      console.log("downloaded image");

      //return { edgesBlob: edgesImage, nodesBlob: nodesImage };
    };

    if (reactFlowInstance) {
      getImage();
      //   toBlob(reactFlowRef.current)
      //     .then((blob) => {
      //       if (window.saveAs) {
      //         window.saveAs(blob, "flowmap.png");
      //       } else {
      //         console.log("nope");
      //       }
      //     })
      //     .catch((e) => console.log(e));
    }
  }, [reactFlowInstance, reactFlowRef]);

  // const downloadAsImage = useCallback(() => {
  //   if (reactFlowInstance) {
  //     domtoimage
  //       .toBlob(reactFlowRef.current)
  //       .then((blob) => {
  //         if (window.saveAs) {
  //           window.saveAs(blob, "flowmap.png");
  //         } else {
  //           console.log("nope");
  //         }
  //       })
  //       .catch((e) => console.error(e));
  //   }
  // }, [reactFlowInstance, reactFlowRef]);

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
        <Button
          className="LEFTSB__option-button"
          onClick={downloadAsImage}
          disableElevation
          variant="contained"
        >
          Download as image
        </Button>
      </div>
    </div>
  );
}

export default LeftSBOptions;
