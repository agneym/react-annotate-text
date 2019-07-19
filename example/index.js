import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTextHighlight from "../src/index";
import { htmlContent } from "./const";
import "./styles.css";
const nanoId = require("nano-id");

function App() {
  const [highlightData, setHighlightData] = useState([]);

  const addHighlightClick = value => {
    setHighlightData([...highlightData, { ...value, id: nanoId() }]);
  };

  const removeHighlightClick = id => {
    setHighlightData(previousHighlightData => {
      return previousHighlightData.filter(
        highlightData => highlightData.id !== id
      );
    });
  };

  useEffect(() => {
    console.log("highlightData", highlightData);
  });

  return (
    <div className="container">
      <ReactTextHighlight
        srcDoc={htmlContent}
        iframeTitle={"Demo"}
        height={600}
        width={500}
        highlightData={highlightData}
        selectionPopup={position => (
          <button
            style={{
              backgroundColor: "red",
              cursor: "pointer",
              height: 40,
              width: 120
            }}
            onClick={() => addHighlightClick(position)}
          >
            Add Highlight
          </button>
        )}
        hoverPopup={id => (
          <button
            style={{
              backgroundColor: "red",
              cursor: "pointer",
              height: 70,
              width: 120
            }}
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
