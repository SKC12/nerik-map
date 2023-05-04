import { useState } from "react";
import useStore from "../../../store";

function RightSideBar(props) {
  const verticalLayout = useStore((state) => state.verticalLayout);
  const [open, setOpen] = useState(!verticalLayout);
  const edges = props.edges;
  const legendLine = <line x1="1" y1="0" x2="50" y2="0"></line>;
  const getFlowRiverJSX = () => {
    let flowRivers = [];

    return edges.map((edge) => {
      if (!flowRivers.includes(edge.data.flowRiver) && edge.data.flowRiver) {
        flowRivers.push(edge.data.flowRiver);

        return (
          <div
            key={edge.data.flowRiver}
            className="RIGHTSB__legend-flowRiver-container"
          >
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: edge.style.stroke,
                fill: "none",
                strokeDasharray: "3px",
              }}
            >
              {legendLine}
            </svg>

            <p className="RIGHTSB__legend-flow-name">{edge.data.flowRiver}</p>
          </div>
        );
      } else return null;
    });
  };

  return (
    <div
      className="RIGHTSB"
      style={{
        transform: `${open ? "" : "translate(320px)"}`,
      }}
    >
      <div className="RIGHTSB__open-tab" onClick={() => setOpen(!open)}>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-double-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-double-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
            <path
              fillRule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        )}
      </div>
      <div className="RIGHTSB__inner-container">
        <div className="RIGHTSB__legend">
          <h3>Legend</h3>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "3px",
              }}
            >
              {legendLine}
            </svg>

            <p className="RIGHTSB__legend-flow-name">Known Flow River</p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "3px",
                opacity: "35%",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">Unknown Flow River</p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "7px",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">Predominant Direction</p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "14px",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">Unidirectional</p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "6px 6px 3px 6px",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">
              Tidal Flow River Cycle (active/total)
            </p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "6px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "6px 6px 3px 3px 3px 6px",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">
              Erratic Flow River (chance of occuring)
            </p>
          </div>
          <div className="RIGHTSB__legend-flow-container">
            <svg
              className="RIGHTSB__legend-flow-img"
              style={{
                strokeWidth: "2px",
                stroke: "red",
                fill: "none",
                strokeDasharray: "3px 6px 3px 6px",
                height: "2px",
              }}
            >
              {legendLine}
            </svg>
            <p className="RIGHTSB__legend-flow-name">Route Off Flow River</p>
          </div>
          <hr></hr>
          <div className="RIGHTSB__legend-florRivers-container">
            {getFlowRiverJSX()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
