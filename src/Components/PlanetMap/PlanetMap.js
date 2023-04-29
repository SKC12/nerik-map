import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import PlanetLeftSB from "./Sidebar/PlanetLeftSB";
import PlanetRightSB from "./Sidebar/PlanetRightSB";
import "../../style/PlanetMap.css";
import useStore from "../../store";
import { shallow } from "zustand/shallow";
import { PlanetNode } from "./PlanetNode";
import PlanetOuterBgNode from "./PlanetOuterBgNode";
import PlanetInnerBgNode from "./PlanetInnerBgNode";
import StarsBgNode from "./PlanetStarsBgNode";
import SphereLimitsNode from "./PlanetSphereLimitsNode";
import { getCoords } from "../utils";

const scale = 5;

let baseMapHeight = 200 * scale;
let baseMapWidth = 200 * scale;

const nodeTypes = {
  planetNode: PlanetNode,
  outerBg: PlanetOuterBgNode,
  innerBg: PlanetInnerBgNode,
  starsBg: StarsBgNode,
  sphereLimitNode: SphereLimitsNode,
};

function PlanetMap(props) {
  const planetScreenData = useStore((state) => state.planetScreenData, shallow);
  const sphereRadius = planetScreenData[0].info.sphereRadius;
  const initialNodes = planetScreenData.map((planet) => {
    let node = {
      id: planet.name + planet.orbitRadius,
      type: "planetNode",
      position: getCoords(
        (parseInt(planet.orbitRadius) * scale * 10) / 2,
        planet.info.angle
      ),
      data: planet,
      draggable: false,
    };
    return node;
  });

  //console.log(initialNodes);

  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState(
    [
      {
        id: "starsBg",
        type: "starsBg",
        position: { x: 0, y: 0 },
        data: { width: baseMapWidth * 600, height: baseMapHeight * 600 },
        draggable: false,
        selectable: false,
        zIndex: -2,
      },
      {
        id: "outerBg",
        type: "outerBg",
        position: { x: 0, y: 0 },
        data: { width: baseMapWidth * 280, height: baseMapHeight * 280 },
        draggable: false,
        selectable: false,
        zIndex: -1,
      },
      {
        id: "innerBg",
        type: "innerBg",
        position: { x: 0, y: 0 },
        data: { width: baseMapWidth * 10, height: baseMapHeight * 10 },
        draggable: false,
        selectable: false,
        zIndex: -1,
      },
      {
        id: "sphereLimitNode",
        type: "sphereLimitNode",
        position: { x: 0, y: 0 },
        data: { sphereRadius: sphereRadius },
        draggable: false,
        selectable: false,
        zIndex: -1,
      },
    ].concat(initialNodes)
  );
  const [selectedNode, setSelectedNode] = useState(null);

  const [edges, setEdges] = useState([]);
  //console.log(nodes);
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

  const selectNode = nodes.filter((nd) => nd.selected === true)[0];

  useEffect(() => {
    setSelectedNode(selectNode);
  }, [selectNode]);

  return (
    <>
      <ReactFlowProvider>
        <PlanetLeftSB
          reactFlowInstance={reactFlowInstance}
          selectedNode={selectedNode}
          scale={scale}
          nodeState={[nodes, setNodes]}
          planetScreenData={planetScreenData}
        />
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
              leavePlanetScreen();
            }}
            className="PLANETMAP__return-container"
          >
            X
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeOrigin={[0.5, 0.5]}
            fitView={true}
            minZoom={0.0025}
            maxZoom={0.5}
            translateExtent={[
              [baseMapWidth * -290, baseMapHeight * -290],
              [baseMapWidth * 290, baseMapHeight * 290],
            ]}
            onInit={setReactFlowInstance}
            deleteKeyCode={null}
          >
            {/* <Background /> */}
            {/* <Controls /> */}
          </ReactFlow>
        </div>
        <PlanetRightSB scale={scale} planetScreenData={planetScreenData} />
      </ReactFlowProvider>
    </>
  );
}

export default PlanetMap;
