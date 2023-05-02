import ReactFlow, { getConnectedEdges } from "reactflow";
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
import { getStyle } from "../utils";

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

  console.log("NODES", nodes, "EDGES", edges);

  useEffect(() => {
    setSelectedNode(selectNode);
  }, [selectNode]);

  useEffect(() => {
    setSelectedEdge(selectEdge);
  }, [selectEdge]);

  useEffect(() => {
    updateFlowRiverColors(flowRiverColors);
  }, [flowRiverColors, updateFlowRiverColors]);

  const onDragEnd = useCallback(
    (e, node) => {
      let position = node.position;
      const newNode = {
        ...node,
        data: {
          ...node.data,
          xCoord: `${position.x / scale + 11}`,
          yCoord: `${position.y / scale + 11}`,
        },
      };

      let conenctedEdges = getConnectedEdges([node], edges);
      let newEdges = conenctedEdges.map((edg) => {
        if (edg.data.sphereW === newNode.data.shortName) {
          edg.data.xCoordW = newNode.data.xCoord;
          edg.data.yCoordW = newNode.data.yCoord;
        } else if (edg.data.sphereE === newNode.data.shortName) {
          edg.data.xCoordE = newNode.data.xCoord;
          edg.data.yCoordE = newNode.data.yCoord;
        }

        edg.data.dist = Math.sqrt(
          Math.pow(parseInt(edg.data.xCoordW) - parseInt(edg.data.xCoordE), 2) +
            Math.pow(parseInt(edg.data.yCoordW) - parseInt(edg.data.yCoordE), 2)
        ).toFixed(2);

        if (edg.data.type === "uniW") {
          if (edg.data.timeW) {
            edg.data.speed = (edg.data.dist / edg.data.timeW).toFixed(2);
          }
        } else if (edg.data.type === "uniE") {
          if (edg.data.timeW) {
            edg.data.speed = (edg.data.dist / edg.data.timeE).toFixed(2);
          }
        } else {
          if (edg.data.timeW && edg.data.timeE) {
            edg.data.speed = (
              edg.data.dist /
              ((parseInt(edg.data.timeW) + parseInt(edg.data.timeE)) / 2)
            ).toFixed(2);
          }
        }
        edg.style = getStyle(edg.data, flowRiverColors, scale);

        return edg;
      });

      setNodes(
        nodes.map((nd) => {
          if (nd.id === node.id) {
            nd = newNode;
          }
          return nd;
        })
      );

      setEdges(
        edges.map((edg) => {
          for (let i = 0; i < newEdges.length; i++) {
            if (edg.id === newEdges[i].id) {
              edg = newEdges[i];
            }
          }
          return edg;
        })
      );
    },
    [scale, nodes, setNodes, edges, setEdges, flowRiverColors]
  );

  const onSphereDrop = useCallback(
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
          yCoord: `${position.y / scale + 11}`,
          "onMap?": "Yes",
          isKnown: "yes",
        },
      };
      if (!nodes.filter((nd) => nd.id === newSphere.id).length) {
        addNode(newSphere);
      }
    },
    [reactFlowInstance, addNode, nodes, scale]
  );

  const onDragSphereOver = useCallback((e) => {
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

  return (
    <>
      <LeftSideBar
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        selectedEdge={selectedEdge}
        setSelectedEdge={setSelectedEdge}
        reactFlowInstance={reactFlowInstance}
        reactFlowRef={reactFlowRef}
        scale={scale}
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
          onNodeDragStop={onDragEnd}
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
