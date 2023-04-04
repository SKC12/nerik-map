import { Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

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

    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    padding: "0px",
    paddingLeft: "4px",
  },
};

function LeftSBNew(props) {
  const [sphere1, setSphere1] = useState("");
  const [sphere2, setSphere2] = useState("");

  const nodes = props.nodes;

  const sphereOptions = nodes.reduce((options, nd) => {
    if (nd.data.shortName) {
      options.push(nd.data.shortName);
    }
    return options;
  }, []);

  function getId(count) {
    if (!nodes.find((nd) => nd.id === `Sphere ${count}`)) {
      return `Sphere ${count}`;
    } else {
      return getId(count + 1);
    }
  }

  const onDragStart = (event) => {
    let id = getId(1);
    console.log("ID", id);
    event.dataTransfer.setData("text/plain", id);
  };

  const createFlowRiver = (event) => {};

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
            sx={selectStyle}
            options={sphereOptions}
            getOptionDisabled={(option) => option === sphere2}
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
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
            sx={selectStyle}
            options={sphereOptions}
            getOptionDisabled={(option) => option === sphere1}
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
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
