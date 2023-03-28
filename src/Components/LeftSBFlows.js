import { getConnectedEdges } from "reactflow";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const inputStyle = {
  "& .MuiInputBase-input.Mui-disabled": {
    borderStyle: "none",
    WebkitTextFillColor: "rgb(184, 184, 196)",
    backgroundColor: "rgb(69, 72, 90)",
    padding: "4px",
    height: "16px",
  },
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "rgb(84, 84, 104);",
    backgroundColor: "white",
    fontSize: "14px",
    border: "black 1px solid",
    borderRadius: "10px",
    paddingLeft: "4px",
    height: "16px",
  },
};

const selectStyle = {
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "rgb(84, 84, 104)",
    backgroundColor: "white",

    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    padding: "0px",
    paddingLeft: "4px",
  },
};

function getFormattedFlowType(type) {
  if (type.includes("predominant")) return "Predominant";
  if (type.includes("uni")) return "Unidirectional";
  if (type.includes("erratic")) return "Erratic";
  if (type.includes("tide")) return "Tidal";
  return "Regular";
}

function Flow(props) {
  const [editMode, setEditMode] = useState(false);
  const edge = props.edge;
  const [tempData, setTempData] = useState(edge.data);
  const [known, setKnown] = useState(edge.data.isKnown === "yes");
  const [selectType, setSelectType] = useState(
    edge.data.type.includes("predominant")
      ? "predominant"
      : edge.data.type.includes("uni")
      ? "uni"
      : edge.data.type
  );
  const setEdges = props.setEdges;
  const direction = props.direction;

  //console.log(edge.id, selectType);

  //Reset states on edge change
  useEffect(() => {
    setTempData(edge.data);
    setEditMode(false);
    setKnown(edge.data.isKnown === "yes");
    setSelectType(
      edge.data.type.includes("predominant")
        ? "predominant"
        : edge.data.type.includes("uni")
        ? "uni"
        : edge.data.type
    );
  }, [edge]);

  const handleTypeChange = (e) => {
    setSelectType(e.target.value);
    let flowType = e.target.value;
    if (flowType === "predominant") {
      if (parseInt(tempData.timeW) < parseInt(tempData.timeE)) {
        flowType = "predominantW";
      } else {
        flowType = "predominantE";
      }
    }
    if (flowType === "uni") {
      if (tempData.timeW) {
        flowType = "uniW";
      } else {
        flowType = "uniE";
      }
    }
    setTempData({ ...tempData, type: flowType });
  };

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  const onClickCancel = () => {
    setTempData(edge.data);
    setEditMode(false);
  };

  const handleKnownCheckbox = () => {
    !known
      ? setTempData({ ...tempData, isKnown: "yes" })
      : setTempData({ ...tempData, isKnown: "no" });
    setKnown(!known);
  };

  const onClickSave = () => {
    setEdges((edgs) =>
      edgs.map((edg) => {
        if (edg.id === edge.data.sphereW + " to " + edge.data.sphereE) {
          console.log(edg);
          edg.data = tempData;
          console.log(edg);
        }

        return edg;
      })
    );
    setEditMode(false);
  };

  return (
    <>
      <div key={edge.id} className="LEFTSB__flow-container">
        {!editMode ? (
          <div onClick={onClickEdit} className="LEFTSB__icon-container">
            <svg
              className="LEFTSB__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
            </svg>
          </div>
        ) : (
          <div className="LEFTSB__icon-container">
            <div onClick={onClickSave} className="LEFTSB__icon">
              <svg
                className="LEFTSB__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </div>

            <div onClick={onClickCancel} className="LEFTSB__icon">
              <svg
                className="LEFTSB__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
        )}
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-main-label">
            &#8226; {direction === "incoming" ? edge.source : edge.target}
          </label>
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow River:</label>

          <TextField
            variant="standard"
            className="LEFTSB__flow-data"
            onChange={(e) =>
              setTempData({ ...tempData, flowRiver: e.target.value })
            }
            value={tempData.flowRiver}
            disabled={!editMode}
            InputProps={{
              disableUnderline: true,
            }}
            sx={inputStyle}
          />
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow known?</label>
          {editMode ? (
            <input
              type="checkbox"
              id="knowncb"
              name="knowncb"
              checked={known}
              onChange={handleKnownCheckbox}
            ></input>
          ) : (
            <p className="LEFTSB__flow-data">{edge.data.isKnown}</p>
          )}
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Flow Type:</label>
          {editMode ? (
            <Select
              size="small"
              value={selectType}
              onChange={handleTypeChange}
              sx={selectStyle}
            >
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="predominant">Predominant</MenuItem>
              <MenuItem value="uni">Unidirectional</MenuItem>
              <MenuItem value="erratic">Erratic</MenuItem>
              <MenuItem value="tide">Tidal</MenuItem>
            </Select>
          ) : (
            <p className="LEFTSB__flow-data">
              {getFormattedFlowType(tempData.type)}
            </p>
          )}
        </div>
        <div className="LEFTSB__flow-item-container">
          <label className="LEFTSB__flow-label">Travel Time (days):</label>

          <TextField
            variant="standard"
            className="LEFTSB__flow-data"
            onChange={(e) => {
              if (direction === "incoming") {
                setTempData({ ...tempData, timeW: e.target.value });
              } else {
                setTempData({ ...tempData, timeE: e.target.value });
              }
            }}
            value={direction === "incoming" ? tempData.timeW : tempData.timeE}
            disabled={!editMode}
            InputProps={{
              disableUnderline: true,
            }}
            sx={inputStyle}
          />
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
