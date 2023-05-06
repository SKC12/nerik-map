import { create } from "zustand";

import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

import { getStyle } from "./Components/utils";

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

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  dataLoaded: false,
  toggleDataLoaded: () => set((state) => ({ dataLoaded: !state.dataLoaded })),
  scale: 5,
  planetScreenData: null,
  flowRiverColors: defaultFlowRiverColors,
  minZoom: 1,
  setMinZoom: (zoomLevel) => {
    set({ minZoom: zoomLevel });
  },
  isAnimated: true,
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
  verticalLayout: false,
  setVerticalLayout: (newVerticalLayout) => {
    set({
      verticalLayout: newVerticalLayout,
    });
  },
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
    //console.log("set nodes", get().nodes);
  },
  setEdges: (newEdges) => {
    set({
      edges: newEdges,
    });
    //console.log("set edges", get().nodes);
  },
  setFlowRiverColors: (newFlowRiverColors) => {
    set({
      flowRiverColors: newFlowRiverColors,
    });
  },
  setPlanetScreenData: (planetsData) => {
    set({
      planetScreenData: planetsData,
    });
    //console.log(get().planetScreenData);
  },
  leavePlanetScreen: () => {
    set({
      planetScreenData: null,
    });
    //console.log(get().planetScreenData);
  },
  loadFromLocalStorage: async () => {
    const data = JSON.parse(localStorage.getItem("sbej-flowmap"));
    if (data) {
      set({
        nodes: data.nodes || [],
      });
      set({
        edges: data.edges || [],
      });
      set({
        dataLoaded: true,
      });
    }
  },

  loadFromFile: (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      let data = JSON.parse(e.target.result);
      if (data) {
        set({
          nodes: data.nodes || [],
        });
        set({
          edges: data.edges || [],
        });
        set({
          dataLoaded: true,
        });
      }
    };
    reader.readAsText(file);
  },
}));

export default useStore;
