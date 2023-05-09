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
import PhlogistonBgNode from "./PlanetPhlogistonBgNode";
import SphereLimitsNode from "./PlanetSphereLimitsNode";
import { getAnglesArray, getCoords } from "../utils";
import { getShapeFromUnicode } from "../utils";
import { BeltNode } from "./BeltNode";

const scale = 5;

let baseMapHeight = 200 * scale;
let baseMapWidth = 200 * scale;

const nodeTypes = {
  planetNode: PlanetNode,
  beltNode: BeltNode,
  outerBg: PlanetOuterBgNode,
  innerBg: PlanetInnerBgNode,
  phlogistonBg: PhlogistonBgNode,
  sphereLimitNode: SphereLimitsNode,
};

function PlanetMap(props) {
  const planetScreenData = useStore((state) => state.planetScreenData, shallow);
  const planets = planetScreenData.planets;
  const sphereRadius = planetScreenData.sphereRadius;
  const onClickSelect = useCallback((planet, nodes) => {
    setNodes(
      nodes.map((nd) => {
        if (nd.id.includes(planet.name + planet.orbitRadius)) {
          nd.selected = true;
        } else {
          nd.selected = false;
        }
        return nd;
      })
    );
  }, []);
  const initialNodes = planets.reduce((array, planet) => {
    if (getShapeFromUnicode(planet.info.shape) === "Belt") {
      let beltArray = getAnglesArray(16).map((angle) => {
        let node = {
          id: planet.name + planet.orbitRadius + angle,
          type: "beltNode",
          position: getCoords(
            (parseInt(planet.orbitRadius) * scale * 10) / 2,
            angle
          ),
          data: { ...planet, beltAngle: angle, onClickSelect: onClickSelect },
          draggable: false,
        };
        return node;
      });
      return [...array, ...beltArray];
    } else {
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
      return [...array, node];
    }
  }, []);
  // console.log("INITIAL NODES", initialNodes);

  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState(
    initialNodes.concat([
      {
        id: "phlogistonBg",
        type: "phlogistonBg",
        position: { x: 0, y: 0 },
        data: { width: baseMapWidth * 600, height: baseMapHeight * 600 },
        draggable: false,
        selectable: false,
        zIndex: -3,
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
        zIndex: -2,
      },
    ])
  );
  // console.log("NODES", nodes);
  const [selectedNode, setSelectedNode] = useState(null);

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
          onClickSelect={onClickSelect}
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
            proOptions={{ hideAttribution: true }}
          >
            {/* <Background /> */}
            {/* <Controls /> */}
          </ReactFlow>
        </div>
        <PlanetRightSB
          onClickSelect={onClickSelect}
          scale={scale}
          planetScreenData={planetScreenData}
        />
      </ReactFlowProvider>
    </>
  );
}

export default PlanetMap;
