import { Autocomplete, Button, Slider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getStyle } from "../../utils";

import { useState } from "react";
import greySphere from "../../../img/Grey_Sphere.webp";

import useStore from "../../../store";
import { shallow } from "zustand/shallow";

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
    WebkitTextFillColor: "rgb(213, 213, 230);",
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
  const setEdges = useStore((state) => state.setEdges, shallow);
  const edges = useStore((state) => state.edges, shallow);
  const nodes = useStore((state) => state.nodes, shallow);
  const scale = props.scale;
  const flowRiverColors = useStore((state) => state.flowRiverColors, shallow);
  const setFlowRiverColors = useStore(
    (state) => state.setFlowRiverColors,
    shallow
  );
  //console.log(flowRiverColors);

  const flowRiverOptions = edges.reduce((flowRivers, edge) => {
    if (!flowRivers.includes(edge.data.flowRiver)) {
      flowRivers.push(edge.data.flowRiver);
    }
    return flowRivers;
  }, []);

  console.log("nodes", nodes);

  const sphereOptions = nodes
    ? nodes
        .reduce((options, nd) => {
          console.log(options, nd);
          if (nd.data.shortName) {
            options.push(nd.data.shortName);
          }
          return options;
        }, [])
        .sort((a, b) => -b.localeCompare(a))
    : [];

  const [sphereDropdown, setSphereDropdown] = useState(false);
  const [flowDropdown, setFlowDropdown] = useState(false);

  //New sphere state
  const [sphereData, setSphereData] = useState({
    shortName: getId(1),
    sphere: "Newspherespace",
    sphereRadius: "10000",
    region: "",
    flowRiver: "",
    population: "",
    activity: "",
    controlled: "",
    description: "",
    source: "",
    creator: "",
    website: "",
  });

  //New flow state
  const [sphere1, setSphere1] = useState(sphereOptions[0]);
  const [sphere2, setSphere2] = useState(sphereOptions[1]);
  const [sphere1InputValue, setSphere1InputValue] = useState("");
  const [sphere2InputValue, setSphere2InputValue] = useState("");
  const [flowRiverInputValue, setFlowRiverInputValue] = useState("");
  const [timeSphere1, setTimeSphere1] = useState("1");
  const [timeSphere2, setTimeSphere2] = useState("1");
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
    let transferData = sphereData;
    if (!sphereData.shortName) transferData.shortName = getId(1);
    let dataString = JSON.stringify(transferData);
    //console.log("ID", id);
    event.dataTransfer.setData("text/plain", dataString);
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
        scale: scale,
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
      console.log("newEdge", newEdge);
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
      <div
        onClick={() => setSphereDropdown(!sphereDropdown)}
        className="LEFTSB__new-dropdown"
      >
        <label className="LEFTSB__new-main-label">New Sphere:</label>

        <div className="LEFTSB__new-dropdown-arrow">
          {sphereDropdown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-up-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
          )}
        </div>
      </div>
      {sphereDropdown ? (
        <>
          <div className="LEFTSB__new-sphere-container">
            <div
              style={style}
              onDragStart={(e) => onDragStart(e)}
              draggable
            ></div>
            <p className="LEFTSB__data">Drag into map to create new Sphere</p>
            <div className="LEFTSB__new-sphere-inner-container">
              <label className="LEFTSB__data-label">Full Name:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.sphere}
                onChange={(e) => {
                  setSphereData({ ...sphereData, sphere: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Short Name:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.shortName}
                onChange={(e) => {
                  setSphereData({ ...sphereData, shortName: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">
                Radius (Million Miles):
              </label>
              <div className="LEFTSB__sphere-radius-container">
                <Slider
                  size="small"
                  className="LEFTSB__data LEFTSB__slider"
                  value={sphereData.sphereRadius}
                  onChange={(e) => {
                    setSphereData({
                      ...sphereData,
                      sphereRadius: e.target.value,
                    });
                  }}
                  sx={{ p: 0 }}
                  max={20000}
                  step={1000}
                  marks
                ></Slider>
                <p className="LEFTSB__data LEFTSB__data-radius">
                  {sphereData.sphereRadius}
                </p>
              </div>

              <label className="LEFTSB__data-label">Region:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.region}
                onChange={(e) => {
                  setSphereData({ ...sphereData, region: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Population:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.population}
                onChange={(e) => {
                  setSphereData({ ...sphereData, population: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Activity:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.activity}
                onChange={(e) => {
                  setSphereData({ ...sphereData, activity: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Controlled By:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.controlled}
                onChange={(e) => {
                  setSphereData({ ...sphereData, controlled: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Description:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.description}
                onChange={(e) => {
                  setSphereData({ ...sphereData, description: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 300,
                }}
                sx={inputStyle}
                multiline
              ></TextField>
              <label className="LEFTSB__data-label">Source:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.source}
                onChange={(e) => {
                  setSphereData({ ...sphereData, source: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>

              <label className="LEFTSB__data-label">Creator:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.creator}
                onChange={(e) => {
                  setSphereData({ ...sphereData, creator: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={inputStyle}
              ></TextField>
              <label className="LEFTSB__data-label">Website:</label>
              <TextField
                variant="standard"
                className="LEFTSB__data"
                value={sphereData.website}
                onChange={(e) => {
                  setSphereData({ ...sphereData, website: e.target.value });
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 50,
                }}
                sx={inputStyle}
              ></TextField>
            </div>
          </div>
        </>
      ) : null}

      <div
        onClick={() => setFlowDropdown(!flowDropdown)}
        className="LEFTSB__new-dropdown"
      >
        <label className="LEFTSB__new-main-label">New Flow River:</label>

        <div className="LEFTSB__new-dropdown-arrow">
          {flowDropdown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-up-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
          )}
        </div>
      </div>
      {flowDropdown ? (
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
              ListboxProps={{
                sx: {
                  fontSize: "14px",
                },
              }}
            ></Autocomplete>
          </div>
          <div className="LEFTSB__new-flow-inner-container">
            <label className="LEFTSB__data-label">Travel Time (days):</label>

            <div className="LEFTSB__new-flow-travel-container">
              <label className="LEFTSB__new-travel-data-label">--&gt;</label>

              <TextField
                variant="standard"
                className="LEFTSB__data"
                type="number"
                onChange={(e) => {
                  const regex = /^[0-9/b]+$/;
                  if (
                    (e.target.value === "" || regex.test(e.target.value)) &&
                    e.target.value < 10000
                  ) {
                    setTimeSphere1(e.target.value);
                  }
                }}
                value={timeSphere1}
                InputProps={{
                  disableUnderline: true,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                inputProps={{
                  maxLength: 5,
                  min: 1,
                  max: 9999,
                }}
                sx={inputStyle}
                error={!(timeSphere1 > 0)}
                helperText={timeSphere1 > 0 ? null : "Invalid time"}
              />
              <label className="LEFTSB__new-travel-data-label">&lt;--</label>
              <TextField
                variant="standard"
                type="number"
                className="LEFTSB__data"
                onChange={(e) => {
                  const regex = /^[0-9/b]+$/;
                  if (
                    (e.target.value === "" || regex.test(e.target.value)) &&
                    e.target.value < 10000
                  ) {
                    setTimeSphere2(e.target.value);
                  }
                }}
                value={timeSphere2}
                InputProps={{
                  disableUnderline: true,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                inputProps={{
                  maxLength: 5,
                  min: 1,
                  max: 9999,
                }}
                sx={inputStyle}
                error={!(timeSphere2 > 0)}
                helperText={timeSphere2 > 0 ? null : "Invalid time"}
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
              ListboxProps={{
                sx: {
                  fontSize: "14px",
                },
              }}
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
              ListboxProps={{
                sx: {
                  fontSize: "14px",
                },
              }}
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
                inputProps={{
                  maxLength: 15,
                }}
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
                  if (newInputValue.length <= 31)
                    setFlowRiverInputValue(newInputValue);
                }}
                sx={selectStyle}
                options={flowRiverOptions}
                defaultValue="Other"
                renderInput={(params) => <TextField {...params} />}
                ListboxProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
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
      ) : null}
    </div>
  );
}

export default LeftSBNew;
