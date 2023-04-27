import { getConnectedEdges } from "reactflow";
import useStore from "../../../store";
import { shallow } from "zustand/shallow";

function getFormattedFlowType(type) {
  if (type.includes("predominant")) return "Predominant";
  if (type.includes("uni")) return "Unidirectional";
  if (type.includes("erratic")) return "Erratic";
  if (type.includes("tide")) return "Tidal";
  return "Regular";
}

function Flow(props) {
  const edge = props.edge;
  const direction = props.direction;

  //console.log(edge.id, selectType);

  return (
    <>
      <div key={edge.id} className="LEFTSB__flow-container">
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-main-label">
            &#8226; {direction === "incoming" ? edge.source : edge.target}
          </label>
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow River:</label>

          <p className="LEFTSB__flow-data">{edge.data.flowRiver}</p>
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow known?</label>

          <p className="LEFTSB__flow-data">{edge.data.isKnown}</p>
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow Type:</label>

          <p className="LEFTSB__flow-data">
            {getFormattedFlowType(edge.data.type)}
          </p>
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Travel Time (days):</label>
          <p className="LEFTSB__flow-data">{`${
            direction === "incoming" ? edge.data.timeW : edge.data.timeE
          }`}</p>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

function LeftSBFlows(props) {
  const selectedNode = props.selectedNode;
  const edges = useStore((state) => state.edges, shallow);
  const hideUnkownPaths = useStore((state) => state.hideUnkownPaths);

  const getFlowsJSX = (node) => {
    let connectedEdges = getConnectedEdges([node], edges).map((edge) => {
      if (!hideUnkownPaths || edge.data.isKnown === "yes") {
        if (edge.source !== node.id && edge.data.type !== "uniW") {
          return <Flow edge={edge} direction={"incoming"} />;
        } else if (edge.source === node.id && edge.data.type !== "uniE") {
          return <Flow edge={edge} direction={"outgoing"} />;
        } else return null;
      } else return null;
    });
    return <div className="LEFTSB__flows-container">{connectedEdges}</div>;
  };

  return selectedNode ? getFlowsJSX(selectedNode) : null;
}

export default LeftSBFlows;
