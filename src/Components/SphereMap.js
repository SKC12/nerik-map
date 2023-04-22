import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import "../style/SphereMap.css";
import { loadCSVSpheres, loadCSVFlows } from "../data-loader";
import { useEffect, useState, useRef, useCallback } from "react";
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

import useStore from "../store";
import { shallow } from "zustand/shallow";

const scale = 5;

let baseMapHeight = 399 * scale;
let baseMapWidth = 567 * scale;

const nodeTypes = { sphereNode: SphereNode, bgNode: BgNode };
const edgeTypes = {
  floating: FloatingEdge,
};

const defaultFlowRiverColors = {
  "Arcane Inner Flow": "#fcf003",
  "Arcane Outer Flow": "#fca503",
  "Braineater Flow": "#a503fc",
  "Casa Flow": "#00ad31",
  "Crystal Flow": "#ff00bf",
  "Eadhel Flow": "#90eb8d",
  "Gate Flow": "#94dbf7",
  "Hammer Flow": "#99680e",
  "Golot Flow": "#007874",
  "Gorth Flow": "#b1deca",
  "Lost Flow": "#c2c793",
  "Mael Flow": "#4b3870",
  "Mystara Flow": "#050780",
  Other: "#575757",
  "Pillar Flow": "#3f6b8f",
  "Pirtel Flow": "#e0e0e0",
  "Radiant Flow": "#ff0000",
  "Red-Heart Flow": "#ff7e1c",
  "Seven Stars Flow": "#d98c52",
  "The Maelstrom": "#d62dc2",
  "Trulian Ring": "#593455",
  "Vodoni Flow": "#0b1d57",
  "Vodonika Flow": "#7d0b13",
  "Way Flow": "#268496",
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  scale: state.scale,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateFlowRiverColors: state.updateFlowRiverColors,
  updateAnimation: state.updateAnimation,
  updateProjectedTime: state.updateProjectedTime,
  updateHideUnknownPaths: state.updateHideUnknownPaths,
  updateHideUnknownSpheres: state.updateHideUnknownSpheres,
  addNode: state.addNode,
});

function SphereMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const {
    scale,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateFlowRiverColors,
    nodes,
    edges,
    addNode,
    updateAnimation,
    updateProjectedTime,
    updateHideUnknownPaths,
    updateHideUnknownSpheres,
  } = useStore(selector, shallow);

  const setEdges = useStore((state) => state.setEdges, shallow);
  const setNodes = useStore((state) => state.setNodes, shallow);
  const animated = useStore((state) => state.isAnimated);
  const projectedTime = useStore((state) => state.projectedTime);
  const hideUnknownPaths = useStore((state) => state.hideUnknownPaths);
  const hideUnknownSpheres = useStore((state) => state.hideUnknownSpheres);
  const draggable = useStore((state) => state.draggable);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const flowRiverColors = useStore((state) => state.flowRiverColors);

  const reactFlowRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const selectNode = nodes.filter((nd) => nd.selected === true)[0];
  const selectEdge = edges.filter((edg) => edg.selected === true)[0];

  //console.log(selectedEdge, selectedNode);
  //console.log(nodes, edges);
  useEffect(() => {
    setSelectedNode(selectNode);
  }, [selectNode]);

  useEffect(() => {
    setSelectedEdge(selectEdge);
  }, [selectEdge]);

  useEffect(() => {
    updateFlowRiverColors(flowRiverColors);
  }, [flowRiverColors, updateFlowRiverColors]);

  const onDragSphereOver = useCallback(
    (e) => {
      e.preventDefault();

      const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const position = reactFlowInstance.project({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });

      const newSphere = {
        id: data.shortName,
        type: "sphereNode",
        position,
        data: {
          ...data,
          planets: [],
          scale,
          xCoord: `${position.x / scale + 11}`,
          yCoord: `${position.x / scale + 11}`,
          "onMap?": "Yes",
          isKnown: "yes",
        },
      };
      addNode(newSphere);
    },
    [reactFlowInstance, addNode, scale]
  );

  const onSphereDrop = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.effect = "move";
  }, []);

  useEffect(() => {
    updateAnimation(animated);
  }, [animated, updateAnimation]);

  useEffect(() => {
    console.log(projectedTime);

    updateProjectedTime(projectedTime);
  }, [projectedTime, updateProjectedTime]);

  useEffect(() => {
    updateHideUnknownPaths(hideUnknownPaths);
  }, [hideUnknownPaths, updateHideUnknownPaths]);

  useEffect(() => {
    updateHideUnknownSpheres(hideUnknownSpheres);
  }, [hideUnknownSpheres, updateHideUnknownSpheres]);

  useEffect(() => {
    async function loadSpheres(sphereData) {
      //let sphereArray = [];
      let sphereArray = await loadCSVSpheres(sphereData);

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
      setEdges(Flow.getEdges(flowsArray, defaultFlowRiverColors, scale));
    }
    loadSpheres(sphereData);
  }, [setNodes, setEdges, scale]);

  //console.log("NODES", nodes);
  console.log("EDGES", edges);

  return (
    <>
      <LeftSideBar
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        selectedEdge={selectedEdge}
        setSelectedEdge={setSelectedEdge}
        reactFlowInstance={reactFlowInstance}
      />
      <div
        ref={reactFlowRef}
        style={{ height: canvasHeight, width: canvasWidth }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
          onDrop={onSphereDrop}
          onDragOver={onDragSphereOver}
          onInit={setReactFlowInstance}
          deleteKeyCode="Delete"
        >
          {/* <Background /> */}
          {/* <Controls /> */}
        </ReactFlow>
      </div>
      <RightSideBar edges={edges} />
    </>
  );
}

export default SphereMap;
