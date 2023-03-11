import "./App.css";
import Map from "./Components/Map";
import SphereMap from "./Components/SphereMap";

function App() {
  let bgRatio = 1.421;
  let canvasHeight = 400;

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <Map width={canvasHeight * bgRatio} height={canvasHeight} /> */}
      <SphereMap
        width={canvasHeight * bgRatio}
        height={canvasHeight}
      ></SphereMap>
    </div>
  );
}

export default App;
