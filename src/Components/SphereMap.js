import ReactFlow, {
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "../style/SphereMap.css";
import { loadCSVSpheres, loadCSVFlows } from "../data-loader";
import { useEffect, useState, useCallback } from "react";
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

let baseMapHeight = 399;
let baseMapWidth = 567;

const nodeTypes = { sphereNode: SphereNode, bgNode: BgNode };
const edgeTypes = {
  floating: FloatingEdge,
};

function SphereMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [spheres, setSpheres] = useState([]);
  const [flows, setFlows] = useState([]);
  const [loadingSphere, setLoadingSphere] = useState(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

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

      let testSphere = {
        sphere: "test",
        shortName: "test",
        sphereRadius: "1",
        xCoord: 0 + 11,
        yCoord: 0 + 11,
        "onMap?": "Yes",
      };

      // let testSphere3 = {
      //   sphere: "test3",
      //   shortName: "test3",
      //   sphereRadius: "1",
      //   xCoord: 194 + 11,
      //   yCoord: 181 + 11,
      //   "onMap?": "Yes",
      // };

      let testSphere2 = {
        sphere: "test2",
        shortName: "test2",
        sphereRadius: 100000,
        xCoord: 580,
        yCoord: 410,
        "onMap?": "Yes",
      };
      //sphereArray.push(testSphere);
      //sphereArray.push(testSphere2);
      //sphereArray.push(testSphere3);

      console.log("SPHERES", sphereArray);
      console.log("FLOWS", flowsArray);

      setNodes(Sphere.getNodes(sphereArray).concat(bgSphere));
      setEdges(Flow.getEges(flowsArray));
    }
    loadSpheres(sphereData);
  }, []);

  console.log("NODES", nodes);
  console.log("EDGES", edges);

  return (
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
          [567, 399],
        ]}
      >
        {/* <Background /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default SphereMap;
