import { create } from "zustand";

import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

import { getStyle } from "./Components/utils";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
  isAnimated: false,
  toggleAnimated: () => set((state) => ({ isAnimated: !state.isAnimated })),
  projectedTime: false,
  toggleProjectedTime: () =>
    set((state) => ({ projectedTime: !state.projectedTime })),
  draggable: false,
  toggleDraggable: () => set((state) => ({ draggable: !state.draggable })),
  hideUnknownPaths: false,
  toggleHideUnknownPaths: () =>
    set((state) => ({ hideUnknownPaths: !state.hideUnknownPaths })),
  hideUnknownSpheres: false,
  toggleHideUnknownSpheres: () =>
    set((state) => ({ hideUnknownSpheres: !state.hideUnknownSpheres })),

  nodes: [],
  edges: [],
  scale: 5,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateFlowRiverColors: (newFlowRiverColors) => {
    set({
      edges: get().edges.map((edg) => {
        edg.style = getStyle(edg.data, newFlowRiverColors, get().scale);
        return edg;
      }),
    });
  },
  updateAnimation: (animated) => {
    set({
      edges: get().edges.map((edg) => {
        edg.data = { ...edg.data, animation: animated };
        return edg;
      }),
    });
  },
  updateProjectedTime: (projectedTime) => {
    set({
      edges: get().edges.map((edg) => {
        edg.data = { ...edg.data, projectedTime: projectedTime };
        return edg;
      }),
    });
  },
  updateHideUnknownPaths: (hideUnknownPaths) => {
    set({
      edges: get().edges.map((edg) => {
        if (edg.data.isKnown === "no") {
          edg.hidden = hideUnknownPaths;
        }
        return edg;
      }),
    });
  },
  updateHideUnknownSpheres: (hideUnknownSpheres) => {
    set({
      nodes: get().nodes.map((nd) => {
        if (nd.data.isKnown === "no") {
          nd.hidden = hideUnknownSpheres;
        }
        return nd;
      }),
    });
  },
  addNode: (newNode) => {
    set({
      nodes: get().nodes.concat(newNode),
    });
  },
  setNodes: (newNodes) => {
    set({
      nodes: newNodes,
    });
    console.log("set nodes", get().nodes);
  },
  setEdges: (newEdges) => {
    set({
      edges: newEdges,
    });
    console.log("set edges", get().nodes);
  },
}));

export default useStore;
