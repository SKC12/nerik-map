import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../../../store";
import SphereCard from "./SphereCard";

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

function LeftSBSearch(props) {
  const nodes = useStore((state) => state.nodes, shallow);
  const [searchInput, setSearchInput] = useState("");

  const filterSpheres = useCallback((searchInput, nodes) => {
    const lowerInput = searchInput.toLowerCase();
    return nodes.filter((nd) => {
      if (nd.type !== "sphereNode") return false;
      if (
        nd.data.shortName.toLowerCase().includes(lowerInput) ||
        // nd.data.description.toLowerCase().includes(lowerInput) ||
        nd.data.sphere.toLowerCase().includes(lowerInput) ||
        nd.data.source.toLowerCase().includes(lowerInput) ||
        nd.data.creator.toLowerCase().includes(lowerInput)
      ) {
        return true;
      }
      return false;
    });
  }, []);
  const filteredNodes = filterSpheres(searchInput, nodes);

  return (
    <div>
      <TextField
        variant="standard"
        className="LEFTSB__data"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={inputStyle}
      />
      <div className="RIGHTSB__sphere-card-container">
        {filteredNodes.map((nd) => {
          return <SphereCard node={nd} />;
        })}
      </div>
    </div>
  );
}

export default LeftSBSearch;
