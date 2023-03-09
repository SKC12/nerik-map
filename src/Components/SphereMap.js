import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { loadCSV } from "../data-loader";
import { useEffect, useState } from "react";
import sphereData from "../data/radiant-triangle.csv";
import { SphereNode } from "./SphereNode";
import { Sphere } from "../models/Sphere";

const nodeTypes = { sphereNode: SphereNode };

function SphereMap(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [spheres, setSpheres] = useState([]);
  const [loadingSphere, setLoadingSphere] = useState(true);

  useEffect(() => {
    setLoadingSphere(true);
    async function loadSpheres(sphereData) {
      let sphereArray = await loadCSV(sphereData);
      setSpheres(sphereArray);
      setLoadingSphere(false);

      let testSphere = {
        sphere: "test",
        sphereRadius: 5000,
        xCoord: 0,
        yCoord: 0,
      };

      let testSphere2 = {
        sphere: "test2",
        sphereRadius: 10000,
        xCoord: 580,
        yCoord: 410,
      };
      sphereArray.push(testSphere);
      sphereArray.push(testSphere2);

      console.log("SPHERES", sphereArray);

      setNodes(Sphere.getNodes(sphereArray));
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
        minZoom={1.2}
        maxZoom={5}
        translateExtent={[
          [-50, -50],
          [630, 460],
        ]}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default SphereMap;
