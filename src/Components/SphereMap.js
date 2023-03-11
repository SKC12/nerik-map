import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "../style/SphereMap.css";
import { loadCSV } from "../data-loader";
import { useEffect, useState, useCallback } from "react";
import sphereData from "../data/nerik.csv";
import { SphereNode } from "./SphereNode";
import { BgNode } from "./BgNode";
import { Sphere } from "../models/Sphere";

const nodeTypes = { sphereNode: SphereNode, bgNode: BgNode };

function SphereMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [spheres, setSpheres] = useState([]);
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
      let sphereArray = await loadCSV(sphereData);
      setSpheres(sphereArray);
      setLoadingSphere(false);

      let bgSphere = {
        id: "bg",
        type: "bgNode",
        position: { x: canvasWidth / 2, y: canvasHeight / 2 },
        data: { width: canvasWidth, height: canvasHeight },
        draggable: false,
        selectable: false,
      };

      let testSphere = {
        sphere: "test",
        sphereRadius: 5000,
        xCoord: 0,
        yCoord: 0,
      };

      let testSphere2 = {
        sphere: "test2",
        sphereRadius: 100000,
        xCoord: 580,
        yCoord: 410,
      };
      sphereArray.push(testSphere);
      sphereArray.push(testSphere2);

      console.log("SPHERES", sphereArray);

      setNodes(Sphere.getNodes(sphereArray).concat(bgSphere));
    }
    loadSpheres(sphereData);
  }, []);

  console.log("NODES", nodes);

  return (
    <div style={{ height: canvasHeight, width: canvasWidth }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView={true}
        minZoom={1}
        maxZoom={15}
        translateExtent={[
          [0, 0],
          [567, 399],
        ]}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default SphereMap;
