import { getConnectedEdges } from "reactflow";

import(getConnectedEdges);

function LeftSBFlows(props) {
  const selectedNode = props.selectedNode;
  const edges = props.edges;
  const hideUnkownPaths = props.hideUnkownPaths;

  const getFlowsJSX = (node) => {
    let connectedEdges = getConnectedEdges([node], edges).map((edge) => {
      if (!hideUnkownPaths || edge.data.isKnown === "yes") {
        if (edge.source !== node.id && edge.data.type !== "uniW") {
          return (
            <>
              <div key={edge.id} className="LEFTSB__flow-container">
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-main-label">
                    &#8226; {edge.source}
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
                  <label className="LEFTSB__flow-label">Flow speed:</label>

                  <p className="LEFTSB__flow-data">{edge.data.speed}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">
                    Time to destination:
                  </label>

                  <p className="LEFTSB__flow-data">
                    {edge.data.timeW + " days"}
                  </p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        } else if (edge.source === node.id && edge.data.type !== "uniE") {
          return (
            <>
              <div key={edge.id} className="LEFTSB__flow-container">
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-main-label">
                    &#8226; {edge.target}
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
                  <label className="LEFTSB__flow-label">Flow speed:</label>

                  <p className="LEFTSB__flow-data">{edge.data.speed}</p>
                </div>
                <div className="LEFTSB__flow-item-container">
                  <label className="LEFTSB__flow-label">
                    Time to destination:
                  </label>
                  <p className="LEFTSB__flow-data">{edge.data.timeE} days</p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        } else return null;
      } else return null;
    });
    return <div className="LEFTSB__flows-container">{connectedEdges}</div>;
  };

  return selectedNode ? getFlowsJSX(selectedNode) : null;
}

export default LeftSBFlows;
