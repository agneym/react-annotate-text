import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Annotations from "./reacthighlight";

function App() {
  return (
    <div className="app-container">
      <Annotations />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
