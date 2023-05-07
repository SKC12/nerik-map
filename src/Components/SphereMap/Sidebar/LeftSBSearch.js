import { InputAdornment } from "@mui/material";
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
  const hideUnknownPaths = useStore((state) => state.hideUnknownPaths);

  const filterSpheres = useCallback(
    (searchInput, nodes) => {
      const lowerInput = searchInput.toLowerCase();
      return nodes
        .filter((nd) => {
          if (nd.type !== "sphereNode") return false;
          if (hideUnknownPaths && nd.data.isKnown === "no") return false;
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
        })
        .sort((a, b) => (a.data.shortName > b.data.shortName ? 1 : -1));
    },
    [hideUnknownPaths]
  );
  const filteredNodes = filterSpheres(searchInput, nodes);

  return (
    <div className="LEFTSB__search-main-container">
      <div className="LEFTSB__search-container">
        <TextField
          key="textfield"
          variant="standard"
          id="searchbar"
          type="search"
          className="LEFTSB__data LEFTSB__search"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          inputProps={{
            maxLength: 30,
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search LEFTSB__search-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </InputAdornment>
            ),
          }}
          sx={inputStyle}
        />
      </div>

      <div className="LEFTSB__sphere-card-container">
        {filteredNodes.map((nd) => {
          return <SphereCard key={nd.data.shortName} node={nd} />;
        })}
      </div>
    </div>
  );
}

export default LeftSBSearch;
