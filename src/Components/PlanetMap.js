import { useCallback, useRef, useState } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import PlanetLeftSB from "./PlanetLeftSB";
import PlanetRightSB from "./PlanetRightSB";
import "../style/PlanetMap.css";
import useStore from "../store";
import { shallow } from "zustand/shallow";

const scale = 5;

let baseMapHeight = 399 * scale;

function PlanetMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const reactFlowRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const leavePlanetScreen = useStore(
    (state) => state.leavePlanetScreen,
    shallow
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <>
      <PlanetLeftSB />
      <div
        ref={reactFlowRef}
        style={{
          height: canvasHeight,
          width: canvasWidth,
          position: "relative",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        <div
          onClick={() => {
            console.log("CLICK");
            leavePlanetScreen();
          }}
          className="PLANETMAP__return-container"
        >
          X
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeOrigin={[0.5, 0.5]}
          fitView={true}
          minZoom={canvasHeight / baseMapHeight}
          maxZoom={30}
          translateExtent={[
            [0, 0],
            [567 * scale, 399 * scale],
          ]}
          onInit={setReactFlowInstance}
          deleteKeyCode="Delete"
        >
          {/* <Background /> */}
          {/* <Controls /> */}
        </ReactFlow>
      </div>
      <PlanetRightSB />
    </>
  );
}

export default PlanetMap;
