import { getConnectedEdges } from "reactflow";

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
  const edges = props.edges;
  const hideUnkownPaths = props.hideUnkownPaths;
  const setEdges = props.setEdges;

  const getFlowsJSX = (node) => {
    let connectedEdges = getConnectedEdges([node], edges).map((edge) => {
      if (!hideUnkownPaths || edge.data.isKnown === "yes") {
        if (edge.source !== node.id && edge.data.type !== "uniW") {
          return (
            <Flow edge={edge} setEdges={setEdges} direction={"incoming"} />
          );
        } else if (edge.source === node.id && edge.data.type !== "uniE") {
          return (
            <Flow edge={edge} setEdges={setEdges} direction={"outgoing"} />
          );
        } else return null;
      } else return null;
    });
    return <div className="LEFTSB__flows-container">{connectedEdges}</div>;
  };

  return selectedNode ? getFlowsJSX(selectedNode) : null;
}

export default LeftSBFlows;