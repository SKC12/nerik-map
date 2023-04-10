import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function LeftSBSphere(props) {
  const [editMode, setEditMode] = useState(false);
  const [selectedNode, setSelectedNode] = [
    props.selectedNode,
    props.setSelectedNode,
  ];
  const selectedData = selectedNode ? selectedNode.data : null;
  //console.log(selectedData);
  const [tempData, setTempData] = useState(selectedData);
  const setNodes = props.setNodes;

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

  useEffect(() => {
    setTempData(selectedData);
    setEditMode(false);
  }, [selectedData]);

  //console.log("tempData", tempData, selectedData);

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  const onClickDelete = () => {};

  const onClickCancel = () => {
    setTempData(selectedData);
    setEditMode(false);
  };

  const onClickSave = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedData.shortName) {
          console.log(node);
          node.data = tempData;
          console.log(node);
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

      <label className="LEFTSB__data-label">Full Name:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, sphere: e.target.value })}
        value={tempData.sphere}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Short Name:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, shortName: e.target.value })
        }
        value={tempData.shortName}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">
        Sphere Radius (Million Miles):
      </label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, sphereRadius: e.target.value })
        }
        value={tempData.sphereRadius}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Region:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, region: e.target.value })}
        value={tempData.region}
        disabled={!editMode}
        multiline
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
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Activity Level:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, activity: e.target.value })}
        value={tempData.activity}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Controlled by:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) =>
          setTempData({ ...tempData, controlled: e.target.value })
        }
        value={tempData.controlled}
        disabled={!editMode}
        multiline
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
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Source:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, source: e.target.value })}
        value={tempData.source}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Creator:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, creator: e.target.value })}
        value={tempData.creator}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <label className="LEFTSB__data-label">Website:</label>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setTempData({ ...tempData, website: e.target.value })}
        value={tempData.website}
        disabled={!editMode}
        multiline
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
    </div>
  ) : null;
}

export default LeftSBSphere;
