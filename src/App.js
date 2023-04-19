import "./style/Main.css";
import SphereMap from "./Components/SphereMap";
import { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  //width/heigth of the coordinates background
  let bgRatio = 1.421;

  const refContainer = useRef();
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  //console.log(containerDimensions);

  useEffect(() => {
    if (refContainer.current) {
      setContainerDimensions({
        width: refContainer.current.offsetHeight * bgRatio,
        height: refContainer.current.offsetHeight,
      });
    }
  }, [bgRatio]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(57, 57, 73)",
        contrastText: "rgb(213, 213, 230)",
      },
      text: {
        primary: "rgb(84, 84, 104)",
      },
    },
    typography: {
      fontFamily: ["Helvetica", "sans-serif"],
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div ref={refContainer} className="main-container">
          <SphereMap
            width={containerDimensions.width}
            height={containerDimensions.height}
          ></SphereMap>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
