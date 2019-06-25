import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
var nanoId = require("nano-id");

import ReactTextHighlight from "../src/index";
import { htmlContent } from "./const";
import "./styles.css";

function App() {
  const [highlightData, setHighlightData] = useState([]);

  const addHighlightClick = value => {
    setHighlightData([...highlightData, { ...value, id: nanoId() }]);
  };

  const removeHighlightClick = id => {
    console.log("id", id);
    setHighlightData(previousHighlightData => {
      return previousHighlightData.filter(
        highlightData => highlightData.id !== id
      );
    });
  };

  useEffect(() => {}, [highlightData]);
  return (
    <div className="container">
      <ReactTextHighlight
        srcDoc={htmlContent}
        height={600}
        width={500}
        data={highlightData}
        highlightPopup={position => (
          <button
            style={{ backgroundColor: "red", cursor: "pointer" }}
            onClick={() => addHighlightClick(position)}
          >
            Add Highlight
          </button>
        )}
        annotationPopup={id => (
          <button
            style={{ backgroundColor: "red", cursor: "pointer" }}
            onClick={() => removeHighlightClick(id)}
          >
            Remove Highlight
          </button>
        )}
      />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
