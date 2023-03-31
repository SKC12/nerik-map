import ReactFlow, {
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "../style/SphereMap.css";
import { loadCSVSpheres, loadCSVFlows } from "../data-loader";
import { useEffect, useState } from "react";
//import sphereData from "../data/radiant-triangle.csv";
import sphereData from "../data/spheres.csv";

//import flowsData from "../data/radiant-flows.csv";
import flowsData from "../data/flows.csv";

import { SphereNode } from "./SphereNode";
import { BgNode } from "./BgNode";
import { Sphere } from "../models/Sphere";
import { Flow } from "../models/Flow";
import FloatingEdge from "./FloatingEdge.js";
import FloatingConnectionLine from "./FloatingConnectionLine.js";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const scale = 5;

let baseMapHeight = 399 * scale;
let baseMapWidth = 567 * scale;

const nodeTypes = { sphereNode: SphereNode, bgNode: BgNode };
const edgeTypes = {
  floating: FloatingEdge,
};

function SphereMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [animated, setAnimated] = useState(false);
  const [projectedTime, setProjectedTime] = useState(false);
  const [hideUnknownPaths, setHideUnknownPaths] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [spheres, setSpheres] = useState([]);
  const [flows, setFlows] = useState([]);
  const [loadingSphere, setLoadingSphere] = useState(true);

  const selectNode = nodes.filter((nd) => nd.selected === true)[0];
  const selectEdge = edges.filter((edg) => edg.selected === true)[0];

  useEffect(() => {
    setSelectedNode(selectNode);
  }, [selectNode]);

  useEffect(() => {
    setSelectedEdge(selectEdge);
  }, [selectEdge]);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );

  useEffect(() => {
    setEdges((edgs) =>
      edgs.map((edg) => {
        edg.data = { ...edg.data, animation: animated };
        return edg;
      })
    );
  }, [animated, setEdges]);

  useEffect(() => {
    setEdges((edgs) =>
      edgs.map((edg) => {
        edg.data = { ...edg.data, projectedTime: projectedTime };
        return edg;
      })
    );
  }, [projectedTime, setEdges]);

  useEffect(() => {
    setEdges((edgs) =>
      edgs.map((edg) => {
        if (edg.data.isKnown === "no") {
          edg.hidden = hideUnknownPaths;
        }
        return edg;
      })
    );
  }, [hideUnknownPaths, setEdges]);

  useEffect(() => {
    setLoadingSphere(true);
    async function loadSpheres(sphereData) {
      //let sphereArray = [];
      let sphereArray = await loadCSVSpheres(sphereData);
      setSpheres(sphereArray);

      //let flowsArray = [];
      let flowsArray = await loadCSVFlows(flowsData);
      setFlows(flowsArray);
      setLoadingSphere(false);

      let bgSphere = {
        id: "bg",
        type: "bgNode",
        position: { x: baseMapWidth / 2, y: baseMapHeight / 2 },
        data: { width: baseMapWidth, height: baseMapHeight },
        draggable: false,
        selectable: false,
        zIndex: -1,
      };

      // let testSphere = {
      //   sphere: "test",
      //   shortName: "test",
      //   sphereRadius: "1",
      //   xCoord: 0 + 11,
      //   yCoord: 0 + 11,
      //   "onMap?": "Yes",
      // };

      // let testSphere3 = {
      //   sphere: "test3",
      //   shortName: "test3",
      //   sphereRadius: "1",
      //   xCoord: 194 + 11,
      //   yCoord: 181 + 11,
      //   "onMap?": "Yes",
      // };

      // let testSphere2 = {
      //   sphere: "test2",
      //   shortName: "test2",
      //   sphereRadius: 10000,
      //   xCoord: 580 * scale,
      //   yCoord: 410 * scale,
      //   "onMap?": "Yes",
      // };
      //sphereArray.push(testSphere);
      //sphereArray.push(testSphere2);
      //sphereArray.push(testSphere3);

      //console.log("SPHERES", sphereArray);
      //console.log("FLOWS", flowsArray);

      setNodes(Sphere.getNodes(sphereArray, scale).concat(bgSphere));
      setEdges(Flow.getEdges(flowsArray, scale));
    }
    loadSpheres(sphereData);
  }, []);

  //console.log("NODES", nodes);
  //console.log("EDGES", edges);

  return (
    <>
      <LeftSideBar
        animationState={[animated, setAnimated]}
        projectedTimeState={[projectedTime, setProjectedTime]}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        selectedEdge={selectedEdge}
        setSelectedEdge={setSelectedEdge}
        edges={edges}
        nodes={nodes}
        dragState={[draggable, setDraggable]}
        unknownPathsState={[hideUnknownPaths, setHideUnknownPaths]}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <div style={{ height: canvasHeight, width: canvasWidth }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          connectionLineComponent={FloatingConnectionLine}
          nodeOrigin={[0.5, 0.5]}
          fitView={true}
          minZoom={canvasHeight / baseMapHeight}
          maxZoom={30}
          translateExtent={[
            [0, 0],
            [567 * scale, 399 * scale],
          ]}
          nodesDraggable={draggable}
        >
          {/* <Background /> */}
          <Controls />
        </ReactFlow>
      </div>
      <RightSideBar edges={edges} />
    </>
  );
}

export default SphereMap;
