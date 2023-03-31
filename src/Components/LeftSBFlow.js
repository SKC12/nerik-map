import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

function getFormattedFlowType(type) {
  //   if (type.includes("predominant")) return "Predominant";
  //   if (type.includes("uni")) return "Unidirectional";
  if (type.includes("erratic")) return "Erratic";
  if (type.includes("tide")) return "Tidal";
  return "Regular";
}

function getTempData(data) {
  return data ? { ...data, type: getFormattedFlowType(data.type) } : null;
}

function LeftSBFlow(props) {
  const [editMode, setEditMode] = useState(false);
  const [selectedEdge, setSelectedNode] = [
    props.selectedEdge,
    props.setSelectedEdge,
  ];
  const selectedData = selectedEdge ? selectedEdge.data : null;
  //console.log(selectedData);
  const [tempData, setTempData] = useState(getTempData(selectedData));
  const setEdges = props.setEdges;
  const nodes = props.nodes;
  const [known, setKnown] = useState(tempData.isKnown === "yes");

  const sphereOptions = nodes.reduce((options, nd) => {
    if (nd.data.shortName) {
      options.push(nd.data.shortName);
    }
    return options;
  }, []);

  const flowOptions = ["Regular", "Erratic", "Tidal"];

  const inputStyle = {
    "& .MuiInputBase-input.Mui-disabled": {
      borderStyle: "none",
      WebkitTextFillColor: "rgb(184, 184, 196);",
      backgroundColor: "rgb(69, 72, 90)",
    },
    "& .MuiInputBase-input": {
      WebkitTextFillColor: "rgb(84, 84, 104);",
      backgroundColor: "white",
      fontSize: "14px",
      border: "black 1px solid",
      borderRadius: "4px",
      paddingLeft: "8px",
    },
  };

  const selectStyle = {
    "& .MuiInputBase-input": {
      WebkitTextFillColor: "rgb(84, 84, 104)",
      backgroundColor: "white",
      borderRadius: "4px",

      fontSize: "14px",
    },
    "& .MuiSelect-select": {
      padding: "0px",
      paddingLeft: "4px",
    },
  };

  useEffect(() => {
    setTempData(getTempData(selectedData));
    setEditMode(false);
  }, [selectedData]);

  //console.log("tempData", tempData, selectedData);

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  const onClickCancel = () => {
    setTempData(getTempData(selectedData));
    setEditMode(false);
  };

  const onClickSave = () => {
    //console.log(tempData, nodes);
    const node1 = nodes.find((nd) => nd.data.shortName === tempData.sphereW);
    const node2 = nodes.find((nd) => nd.data.shortName === tempData.sphereE);
    console.log(
      tempData,
      node1,
      node2,
      node1.position.x,
      node2.position.x,
      node1.position.x < node2.position.x
    );

    let data = {};

    //Reverse coords if node1 isn't the western node.
    if (node1.position.x < node2.position.x) {
      data = { ...tempData };
    } else {
      data = {
        ...tempData,
        sphereW: tempData.sphereE,
        sphereE: tempData.sphereW,
        xCoordW: tempData.xCoordE,
        yCoordW: tempData.yCoordE,
        xCoordE: tempData.xCoordW,
        yCoordE: tempData.yCoordW,
      };
    }

    // Reverse flow type formatting
    if (data.type === "Regular") {
      let timeW = parseInt(tempData.timeW);
      let timeE = parseInt(tempData.timeE);

      if (timeW & timeE) {
        if (timeW === timeE) data.type = "regular";
        if (timeW < timeE) data.type = "predominantW";
        if (timeW > timeE) data.type = "predominantE";
      } else {
        if (timeW) data.type = "uniW";
        if (timeE) data.type = "uniE";
      }
    } else {
      if (data.type === "Erratic") data.type = "erratic";
      if (data.type === "Tidal") data.type = "tide";
    }

    // Calculate distance and speed
    data.dist = Math.sqrt(
      Math.pow(parseInt(data.xCoordW) - parseInt(data.xCoordE), 2) +
        Math.pow(parseInt(data.yCoordW) - parseInt(data.yCoordE), 2)
    ).toFixed(2);
    if (data.type === "uniW") {
      data.speed = (data.dist / data.timeW).toFixed(2);
    } else if (data.type === "uniE") {
      data.speed = (data.dist / data.timeE).toFixed(2);
    } else {
      data.speed = (
        data.dist /
        ((parseInt(data.timeW) + parseInt(data.timeE)) / 2)
      ).toFixed(2);
    }

    setEdges((edgs) =>
      edgs.map((edg) => {
        if (edg.id === selectedEdge.id) {
          console.log(edg);
          edg.id = `${data.sphereW} to ${data.sphereE}`;
          edg.source = data.sphereW;
          edg.target = data.sphereE;
          edg.data = data;
          console.log(edg);
        }

        return edg;
      })
    );
    setEditMode(false);
  };

  const handleKnownCheckbox = () => {
    !known
      ? setTempData({ ...tempData, isKnown: "yes" })
      : setTempData({ ...tempData, isKnown: "no" });
    setKnown(!known);
  };

  return tempData && selectedData ? (
    <div className="LEFTSB__data-container">
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

      <label className="LEFTSB__flow-main-label">{selectedEdge.id}</label>
      <label className="LEFTSB__data-label">Sphere 1:</label>
      {editMode ? (
        <Autocomplete
          disableClearable
          size="small"
          value={tempData.sphereW}
          onChange={(e, newValue) => {
            setTempData({ ...tempData, sphereW: newValue });
          }}
          //   onInputChange={(e, newInputValue) => {
          //     setTempData({ ...tempData, sphereW: newInputValue });
          //   }}
          sx={selectStyle}
          options={sphereOptions}
          getOptionDisabled={(option) => option === tempData.sphereE}
          renderInput={(params) => <TextField {...params} />}
        ></Autocomplete>
      ) : (
        <p className="LEFTSB__flow-data">{tempData.sphereW}</p>
      )}
      <label className="LEFTSB__data-label">Sphere 2:</label>
      {editMode ? (
        <Autocomplete
          disableClearable
          size="small"
          value={tempData.sphereE}
          onChange={(e, newValue) => {
            setTempData({ ...tempData, sphereE: newValue });
          }}
          sx={selectStyle}
          options={sphereOptions}
          getOptionDisabled={(option) => option === tempData.sphereW}
          renderInput={(params) => <TextField {...params} />}
        ></Autocomplete>
      ) : (
        <p className="LEFTSB__flow-data">{tempData.sphereE}</p>
      )}
      <label className="LEFTSB__data-label">Flow Type:</label>
      {editMode ? (
        <Autocomplete
          disableClearable
          size="small"
          value={tempData.type}
          onChange={(e, newValue) => {
            setTempData({ ...tempData, type: newValue });
          }}
          sx={selectStyle}
          options={flowOptions}
          renderInput={(params) => <TextField {...params} />}
        ></Autocomplete>
      ) : (
        <p className="LEFTSB__flow-data">{tempData.type}</p>
      )}
      <label className="LEFTSB__data-label">
        Travel Time to Sphere 1 (days):
      </label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => {
          const regex = /^[0-9/b]+$/;
          if (e.target.value === "" || regex.test(e.target.value)) {
            setTempData({ ...tempData, timeW: e.target.value });
          }
        }}
        value={tempData.timeW}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        sx={inputStyle}
      />

      <label className="LEFTSB__data-label">
        Travel Time to Sphere 2 (days):
      </label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => {
          const regex = /^[0-9/b]+$/;
          if (e.target.value === "" || regex.test(e.target.value)) {
            setTempData({ ...tempData, timeE: e.target.value });
          }
        }}
        value={tempData.timeE}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Flow River:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, flowRiver: e.target.value })
        }
        value={tempData.flowRiver}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Known?</label>
      {editMode ? (
        <input
          className="LEFTSB__flow-data"
          type="checkbox"
          id="knowncb"
          name="knowncb"
          checked={known}
          onChange={handleKnownCheckbox}
        ></input>
      ) : (
        <p className="LEFTSB__flow-data">{tempData.isKnown}</p>
      )}
    </div>
  ) : null;
}

export default LeftSBFlow;
