function RightSideBar(props) {
  return (
    <div className="RIGHTSB">
      <div className="RIGHTSB__inner-container"></div>
      <div className="RIGHTSB__legend">
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            <line x1="1" y1="7" x2="50" y2="7"></line>
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
            }}
          >
            <line x1="1" y1="7" x2="50" y2="7"></line>
          </svg>
          <p className="RIGHTSB__legend-flow-name">Route Off Flow River</p>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
