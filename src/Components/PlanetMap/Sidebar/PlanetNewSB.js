import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import useStore from "../../../store";
import { shallow } from "zustand/shallow";
import {
  getAnglesArray,
  getCoords,
  getShapeFromUnicode,
  getUnicodeFromShape,
} from "../../utils";

const inputStyle = {
  "& .MuiInputBase-input.Mui-disabled": {
    borderStyle: "none",
    WebkitTextFillColor: "rgb(213, 213, 230);",
    backgroundColor: "rgb(81, 85, 102)",
  },
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "rgb(84, 84, 104);",
    backgroundColor: "white",
    fontSize: "14px",
    border: "black 1px solid",
    borderRadius: "4px",
    padding: "2px",
    margins: "0px",
    paddingLeft: "8px",
  },
};

const selectStyle = {
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "rgb(84, 84, 104)",
    backgroundColor: "white",
    border: "black 1px solid",

    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    padding: "0px",
    paddingLeft: "4px",
  },
};

const sizeOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const typeOptions = ["Earth", "Fire", "Water", "Air", "Ice", "Live"];

const shapeOptions = [
  "Special",
  "Belt",
  "Regular",
  "Flat",
  "Amorphous",
  "Cube",
  "Ellipsoid",
  "Sphere",
  "Cluster",
  "Irregular",
];

function PlanetNewSB(props) {
  const planetScreenData = props.planetScreenData;

  const initialData = {
    name: "New Planet",
    orbitRadius: "4000",
    angle: Math.floor(Math.random() * 360),
    size: "C",
    diameter: "",
    shape: "\ue008",
    details: "",
    type: "Earth",
    primaryBody: "",
    moons: "",
    rings: "",
    enviroment: "",
    creator: "",
    description: "",
    notes: "",
    "onMap?": "Yes",
    population: "",
    shortName: planetScreenData.shortName,
    source: "",
    sphere: planetScreenData.sphere,
    website: "",
    sphereRadius: planetScreenData.sphereRadius,
  };

  const scale = props.scale;
  const [tempData, setTempData] = useState(initialData);
  const [nodes, setNodes] = props.nodeState;
  const setSphereNodes = useStore((state) => state.setNodes, shallow);
  const SphereNodes = useStore((state) => state.nodes, shallow);
  const [typeInputValue, setTypeInputValue] = useState("");
  const onClickSelect = props.onClickSelect;
  const beltAsteroidN = props.beltAsteroidN;

  const onClickSave = () => {
    let newNodes = [];
    if (getShapeFromUnicode(tempData.shape) === "Belt") {
      let beltArray = getAnglesArray(beltAsteroidN).map((angle) => {
        let newNode = {
          id: tempData.name + tempData.orbitRadius + angle,
          type: "beltNode",
          position: getCoords(
            (parseInt(tempData.orbitRadius) * scale * 10) / 2,
            angle
          ),
          data: {
            name: tempData.name,
            orbitRadius: tempData.orbitRadius,
            info: tempData,
            beltAngle: angle,
            onClickSelect: onClickSelect,
          },
          draggable: false,
        };
        return newNode;
      });
      newNodes = [...newNodes, ...beltArray];
    } else {
      let newNode = {
        id: tempData.name + tempData.orbitRadius,
        type: "planetNode",
        position: getCoords(
          (parseInt(tempData.orbitRadius) * scale * 10) / 2,
          tempData.angle
        ),
        data: {
          name: tempData.name,
          orbitRadius: tempData.orbitRadius,
          info: tempData,
        },
        draggable: false,
      };
      newNodes = [newNode];
    }
    setNodes([...nodes, ...newNodes]);

    let newPlanet = {
      name: tempData.name,
      orbitRadius: tempData.orbitRadius,
      info: tempData,
    };

    //Add node to store
    setSphereNodes(
      SphereNodes.map((node) => {
        if (node.id === tempData.shortName) {
          node.data.planets.push(newPlanet);
        }
        return node;
      })
    );
  };

  return tempData ? (
    <div className="LEFTSB__data-container">
      <label className="LEFTSB__data-label">Planet Name:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
        value={tempData.name}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">
        Orbit Radius (Million Miles):
      </label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => {
          const regex = /^[0-9/b]+$/;
          if (e.target.value === "" || regex.test(e.target.value)) {
            setTempData({ ...tempData, orbitRadius: e.target.value });
          }
        }}
        value={tempData.orbitRadius}
        inputProps={{
          maxLength: 4,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <div className="LEFTSB__planet-size-container">
        <div className="LEFTSB__data-container">
          <label className="LEFTSB__data-label">Size:</label>
          <Autocomplete
            disableClearable
            size="small"
            value={tempData.size}
            onChange={(e, newValue) => {
              setTempData({ ...tempData, size: newValue });
            }}
            sx={selectStyle}
            options={sizeOptions}
            renderInput={(params) => <TextField {...params} />}
            ListboxProps={{
              sx: {
                fontSize: "14px",
              },
            }}
          ></Autocomplete>
        </div>

        <div className="LEFTSB__data-container">
          <label className="LEFTSB__data-label">Planet Diameter (Miles):</label>
          <TextField
            variant="standard"
            className="LEFTSB__data"
            onChange={(e) => {
              const regex = /^[0-9/b]+$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                setTempData({ ...tempData, sphereRadius: e.target.value });
              }
            }}
            value={tempData.sphereRadius}
            inputProps={{
              maxLength: 10,
            }}
            InputProps={{
              disableUnderline: true,
            }}
            sx={inputStyle}
          />
        </div>
      </div>
      <label className="LEFTSB__data-label">Shape:</label>

      <Autocomplete
        disableClearable
        size="small"
        value={getShapeFromUnicode(tempData.shape)}
        onChange={(e, newValue) => {
          setTempData({
            ...tempData,
            shape: getUnicodeFromShape(newValue),
          });
        }}
        sx={selectStyle}
        options={shapeOptions}
        renderInput={(params) => <TextField {...params} />}
        ListboxProps={{
          sx: {
            fontSize: "14px",
          },
        }}
      ></Autocomplete>

      <label className="LEFTSB__data-label">Shape Details:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, details: e.target.value })}
        value={tempData.details}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Type:</label>
      <Autocomplete
        disableClearable
        size="small"
        value={tempData.type}
        freeSolo={true}
        onChange={(e, newValue) => {
          setTempData({ ...tempData, type: newValue });
        }}
        inputValue={typeInputValue}
        onInputChange={(e, newInputValue) => {
          if (newInputValue.length < 15) {
            setTypeInputValue(newInputValue);
            setTempData({ ...tempData, type: newInputValue });
          }
        }}
        sx={selectStyle}
        options={typeOptions}
        renderInput={(params) => <TextField {...params} />}
        ListboxProps={{
          sx: {
            fontSize: "14px",
          },
        }}
      ></Autocomplete>

      <label className="LEFTSB__data-label">Moons:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => {
          const regex = /^[0-9/b]+$/;
          if (e.target.value === "" || regex.test(e.target.value)) {
            setTempData({ ...tempData, moons: e.target.value });
          }
        }}
        value={tempData.moons}
        inputProps={{
          maxLength: 2,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Rings:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => {
          const regex = /^[0-9/b]+$/;
          if (e.target.value === "" || regex.test(e.target.value)) {
            setTempData({ ...tempData, rings: e.target.value });
          }
        }}
        value={tempData.rings}
        inputProps={{
          maxLength: 2,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Enviroment:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, enviroment: e.target.value })
        }
        value={tempData.enviroment}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Population:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, population: e.target.value })
        }
        value={tempData.population}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Description:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, description: e.target.value })
        }
        value={tempData.description}
        multiline
        inputProps={{
          maxLength: 300,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <div className="LEFTSB__new-button-container">
        <Button onClick={onClickSave} disableElevation variant="contained">
          Create Planet
        </Button>
      </div>
    </div>
  ) : null;
}

export default PlanetNewSB;
