import { Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getStyle } from "../Components/utils.js";

import { useState } from "react";
import greySphere from "../img/Grey_Sphere.webp";
let style = {
  backgroundImage: `url(${greySphere})`,
  width: "100px",
  height: "100px",
  backgroundSize: "102%",
  backgroundPosition: "center",
  backgroundColor: "white",
  borderRadius: "50%",
};

const selectStyle = {
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "rgb(84, 84, 104)",
    backgroundColor: "white",
    borderRadius: "4px",
    border: "black 1px solid",
    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    padding: "0px",
    paddingLeft: "4px",
  },
  "& .MuiAutocomplete-root": {
    flexShrink: 0,
    width: "80%",
  },
};

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
    padding: "2px",
    paddingLeft: "8px",
  },
};

const flowOptions = ["Regular", "Erratic", "Tidal"];

function LeftSBNew(props) {
  const setEdges = props.setEdges;
  const nodes = props.nodes;
  const edges = props.edges;
  const scale = props.scale;
  const flowRiverColors = props.flowRiverColors;
  const setFlowRiverColors = props.setFlowRiverColors;
  //console.log(flowRiverColors);

  const flowRiverOptions = edges.reduce((flowRivers, edge) => {
    if (!flowRivers.includes(edge.data.flowRiver)) {
      flowRivers.push(edge.data.flowRiver);
    }
    return flowRivers;
  }, []);

  const sphereOptions = nodes
    ? nodes
        .reduce((options, nd) => {
          if (nd.data.shortName) {
            options.push(nd.data.shortName);
          }
          return options;
        }, [])
        .sort((a, b) => -b.localeCompare(a))
    : [];

  const [sphere1, setSphere1] = useState(sphereOptions[0]);
  const [sphere2, setSphere2] = useState(sphereOptions[1]);
  const [sphere1InputValue, setSphere1InputValue] = useState("");
  const [sphere2InputValue, setSphere2InputValue] = useState("");
  const [flowRiverInputValue, setFlowRiverInputValue] = useState("");

  const [timeSphere1, setTimeSphere1] = useState("");
  const [timeSphere2, setTimeSphere2] = useState("");
  const [flowType, setFlowType] = useState("Regular");
  const [flowRiver, setFlowRiver] = useState("Other");
  const [typeExtraInfo, setTypeExtraInfo] = useState("");

  function getId(count) {
    if (!nodes.find((nd) => nd.id === `Sphere ${count}`)) {
      return `Sphere ${count}`;
    } else {
      return getId(count + 1);
    }
  }

  const onDragStart = (event) => {
    let id = getId(1);
    //console.log("ID", id);
    event.dataTransfer.setData("text/plain", id);
    var img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const createFlowRiver = (event) => {
    if (sphere1 && sphere2 && timeSphere1 && timeSphere2) {
      let node1 = nodes.find((nd) => nd.data.shortName === sphere1);
      let node2 = nodes.find((nd) => nd.data.shortName === sphere2);

      let data = {
        flowRiver: flowRiverInputValue,
        isKnown: "yes",
        editedSpeed: "no",
        typeExtraInfo: "",
        scale,
      };

      if (node1.position.x < node2.position.x) {
        data = {
          ...data,
          sphereW: sphere1,
          sphereE: sphere2,
          xCoordW: node1.data.xCoord,
          yCoordW: node1.data.yCoord,
          xCoordE: node2.data.xCoord,
          yCoordE: node2.data.yCoord,
          timeW: timeSphere1,
          timeE: timeSphere2,
        };
      } else {
        data = {
          ...data,
          sphereW: sphere2,
          sphereE: sphere1,
          xCoordW: node2.data.xCoord,
          yCoordW: node2.data.yCoord,
          xCoordE: node1.data.xCoord,
          yCoordE: node1.data.yCoord,
          timeW: timeSphere2,
          timeE: timeSphere1,
        };
      }

      // Reverse flow type formatting
      if (flowType === "Regular") {
        let timeW = parseInt(data.timeW);
        let timeE = parseInt(data.timeE);

        if (timeW & timeE) {
          if (timeW === timeE) data.type = "regular";
          if (timeW < timeE) data.type = "predominantW";
          if (timeW > timeE) data.type = "predominantE";
        } else {
          if (timeW) data.type = "uniW";
          if (timeE) data.type = "uniE";
        }
      } else {
        if (flowType === "Erratic") data.type = "erratic";
        if (flowType === "Tidal") data.type = "tide";
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
      let newEdge = {
        id: `${data.sphereW} to ${data.sphereE}`,
        source: data.sphereW,
        target: data.sphereE,
        data: data,
        type: "floating",
        style: getStyle(data, flowRiverColors, 5),
      };
      console.log(newEdge);
      if (!edges.find((edg) => edg.id === newEdge.id)) {
        setEdges(edges.concat(newEdge));
      } else {
        console.log("DUPLICATE");
      }
    } else {
      console.log("ERROR");
    }
  };

  return (
    <div className="LEFTSB__data-container">
      <label className="LEFTSB__new-main-label">New Sphere:</label>
      <div className="LEFTSB__new-sphere-container">
        <div style={style} onDragStart={(e) => onDragStart(e)} draggable></div>
        <p className="LEFTSB__data">Drag into map to create new Sphere</p>
      </div>
      <label className="LEFTSB__new-main-label">New Flow River:</label>
      <div className="LEFTSB__new-flow-container">
        <div className="LEFTSB__new-flow-inner-container">
          <label className="LEFTSB__data-label">Sphere 1:</label>
          <Autocomplete
            disableClearable
            size="small"
            value={sphere1}
            onChange={(e, newValue) => {
              setSphere1(newValue);
            }}
            inputValue={sphere1InputValue}
            onInputChange={(e, newInputValue) => {
              setSphere1InputValue(newInputValue);
            }}
            sx={selectStyle}
            options={sphereOptions}
            getOptionDisabled={(option) => option === sphere2}
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
        </div>
        <div className="LEFTSB__new-flow-inner-container">
          <label className="LEFTSB__data-label">Travel Time (days):</label>

          <div className="LEFTSB__new-flow-travel-container">
            <label className="LEFTSB__new-travel-data-label">--&gt;</label>

            <TextField
              variant="standard"
              className="LEFTSB__data"
              onChange={(e) => {
                const regex = /^[0-9/b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setTimeSphere1(e.target.value);
                }
              }}
              value={timeSphere1}
              InputProps={{
                disableUnderline: true,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={inputStyle}
            />
            <label className="LEFTSB__new-travel-data-label">&lt;--</label>
            <TextField
              variant="standard"
              className="LEFTSB__data"
              onChange={(e) => {
                const regex = /^[0-9/b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setTimeSphere2(e.target.value);
                }
              }}
              value={timeSphere2}
              InputProps={{
                disableUnderline: true,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={inputStyle}
            />
          </div>
        </div>
        <div className="LEFTSB__new-flow-inner-container">
          <label className="LEFTSB__data-label">Sphere 2:</label>
          <Autocomplete
            disableClearable
            size="small"
            value={sphere2}
            onChange={(e, newValue) => {
              setSphere2(newValue);
            }}
            inputValue={sphere2InputValue}
            onInputChange={(e, newInputValue) => {
              setSphere2InputValue(newInputValue);
            }}
            sx={selectStyle}
            options={sphereOptions}
            getOptionDisabled={(option) => option === sphere1}
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
        </div>
        <div className="LEFTSB__new-flow-inner-container">
          <label className="LEFTSB__data-label">Flow Type:</label>
          <Autocomplete
            disableClearable
            size="small"
            value={flowType}
            onChange={(e, newValue) => {
              setFlowType(newValue);
            }}
            sx={selectStyle}
            options={flowOptions}
            defaultValue="Regular"
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
        </div>
        {flowType !== "Regular" ? (
          <div className="LEFTSB__new-flow-inner-container">
            <label className="LEFTSB__data-label">
              Unusual Flow Type Extra Info:
            </label>
            <TextField
              variant="standard"
              className="LEFTSB__data"
              value={typeExtraInfo}
              onChange={(e) => {
                setTypeExtraInfo(e.target.value);
              }}
              InputProps={{
                disableUnderline: true,
              }}
              sx={inputStyle}
            ></TextField>
          </div>
        ) : null}

        <div className="LEFTSB__new-flow-inner-container">
          <label className="LEFTSB__data-label">Flow River:</label>
          <div className="LEFTSB__new-flow-type-container">
            <Autocomplete
              className="LEFTSB__new-flow-type-autocomplete"
              freeSolo={true}
              size="small"
              value={flowRiver}
              onChange={(e, newValue) => {
                setFlowRiver(newValue);
              }}
              inputValue={flowRiverInputValue}
              onInputChange={(e, newInputValue) => {
                setFlowRiverInputValue(newInputValue);
              }}
              sx={selectStyle}
              options={flowRiverOptions}
              defaultValue="Other"
              renderInput={(params) => <TextField {...params} />}
            ></Autocomplete>
            <input
              className="LEFTSB__new-flow-type-color-select"
              type="color"
              value={flowRiverColors[flowRiverInputValue] ?? ""}
              onChange={(e) => {
                setFlowRiverColors({
                  ...flowRiverColors,
                  [flowRiverInputValue]: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="LEFTSB__new-flow-inner-container">
          <div className="LEFTSB__new-button-container">
            <Button
              onClick={createFlowRiver}
              disableElevation
              variant="contained"
            >
              Create Flow River
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSBNew;
