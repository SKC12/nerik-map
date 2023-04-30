import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import "../../style/SphereMap.css";
import { useEffect, useState, useRef, useCallback } from "react";

import { SphereNode } from "./SphereNode";
import { BgNode } from "./BgNode";

import FloatingEdge from "./FloatingEdge.js";
import FloatingConnectionLine from "./FloatingConnectionLine.js";
import LeftSideBar from "./Sidebar/LeftSideBar";
import RightSideBar from "./Sidebar/RightSideBar";

import useStore from "../../store";
import { shallow } from "zustand/shallow";

const scale = 5;

let baseMapHeight = 399 * scale;

const nodeTypes = { sphereNode: SphereNode, bgNode: BgNode };
const edgeTypes = {
  floating: FloatingEdge,
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
  console.log(nodes, edges);
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
    updateProjectedTime(projectedTime);
  }, [projectedTime, updateProjectedTime]);

  useEffect(() => {
    updateHideUnknownPaths(hideUnknownPaths);
  }, [hideUnknownPaths, updateHideUnknownPaths]);

  useEffect(() => {
    updateHideUnknownSpheres(hideUnknownSpheres);
  }, [hideUnknownSpheres, updateHideUnknownSpheres]);

  //console.log("NODES", nodes);
  //console.log("EDGES", edges);

  return (
    <>
      <LeftSideBar
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        selectedEdge={selectedEdge}
        setSelectedEdge={setSelectedEdge}
        reactFlowInstance={reactFlowInstance}
        reactFlowRef={reactFlowRef}
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
