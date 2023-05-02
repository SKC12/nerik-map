import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DelConfirmationDialog from "../../DelConfirmationDialog";
import { Autocomplete } from "@mui/material";
import useStore from "../../../store";
import { shallow } from "zustand/shallow";
import {
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

function PlanetInfoSB(props) {
  const [editMode, setEditMode] = useState(false);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const selectedNode = props.selectedNode;

  const selectedData = selectedNode ? selectedNode.data.info : null;
  const scale = props.scale;
  const [tempData, setTempData] = useState(selectedData);
  const [nodes, setNodes] = props.nodeState;
  const setSphereNodes = useStore((state) => state.setNodes, shallow);
  const SphereNodes = useStore((state) => state.nodes, shallow);
  const [typeInputValue, setTypeInputValue] = useState("");

  const reactFlowInstance = props.reactFlowInstance;

  useEffect(() => {
    setTempData(selectedData);
    setEditMode(false);
  }, [selectedData]);

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  const deleteNode = (node) => {
    //delete node from planetMap
    if (node) reactFlowInstance.deleteElements({ nodes: [node] });
    //delete planet from stored sphere
    setSphereNodes(
      SphereNodes.map((node) => {
        if (node.id === selectedData.shortName) {
          node.data.planets = node.data.planets.filter((planet) => {
            return (
              //for cases where name is blank, check radius
              planet.name !== selectedData.name ||
              planet.orbitRadius !== selectedData.orbitRadius
            );
          });
        }
        return node;
      })
    );
  };

  const onClickDelete = () => {
    setDelDialogOpen(true);
  };

  const onClickCancel = () => {
    setTempData(selectedData);
    setEditMode(false);
  };

  const onClickSave = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === selectedData.name + selectedData.orbitRadius) {
          node.data.info = tempData;
          node.data.name = tempData.name;
          node.data.orbitRadius = tempData.orbitRadius;
          node.id = node.data.name + node.data.orbitRadius;
          node.position = getCoords(
            (parseInt(tempData.orbitRadius) * scale * 10) / 2,
            tempData.angle
          );
        }
        return node;
      })
    );
    setEditMode(false);
  };

  return tempData ? (
    <div className="LEFTSB__data-container">
      {!editMode ? (
        <div className="LEFTSB__icon-container">
          <div onClick={onClickEdit} className="LEFTSB__icon">
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
          <div onClick={onClickDelete} className="LEFTSB__icon">
            <svg
              className="LEFTSB__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />{" "}
            </svg>
          </div>
          <DelConfirmationDialog
            title="Delete this Planet?"
            onDelete={() => deleteNode(selectedNode)}
            open={delDialogOpen}
            setOpen={setDelDialogOpen}
          />
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

      <label className="LEFTSB__data-label">Planet Name:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
        value={tempData.name}
        disabled={!editMode}
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
        disabled={!editMode}
        inputProps={{
          maxLength: 5,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Size:</label>
      {editMode ? (
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
      ) : (
        <p className="LEFTSB__flow-data">{tempData.size}</p>
      )}

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
        disabled={!editMode}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Shape:</label>

      {editMode ? (
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
      ) : (
        <div className="LEFTSB__planet-shape-container">
          <p className="LEFTSB__flow-data" style={{ fontFamily: "Symbol" }}>
            {tempData.shape}
          </p>
          <p className="LEFTSB__flow-data">
            {getShapeFromUnicode(tempData.shape)}
          </p>
        </div>
      )}

      <label className="LEFTSB__data-label">Shape Details:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, details: e.target.value })}
        value={tempData.details}
        disabled={!editMode}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Type:</label>
      {editMode ? (
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
      ) : (
        <p className="LEFTSB__flow-data">{tempData.type}</p>
      )}
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
        disabled={!editMode}
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
        disabled={!editMode}
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
        disabled={!editMode}
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
        disabled={!editMode}
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
        disabled={!editMode}
        multiline
        inputProps={{
          maxLength: 300,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
    </div>
  ) : null;
}

export default PlanetInfoSB;
