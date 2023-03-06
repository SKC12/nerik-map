import "./App.css";
import { loadCSV } from "./data-loader";
import data from "./data/radiant-triangle.csv";

function App() {
  loadCSV(data);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
