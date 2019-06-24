import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
var nanoId = require("nano-id");

import ReactTextHighlight from "../src/index";
import { htmlContent } from "./const";
import "./styles.css";

function App() {
  const [highlightData, setHighighlight] = useState([]);
  const addHighlightsClick = value => {
    setHighighlight([...highlightData, { ...value, id: nanoId() }]);
  };
  const removeHighlight = value => {};

  useEffect(() => {}, [highlightData]);
  return (
    <div className="container">
      <ReactTextHighlight
        //src={"http://sednaenergy.in/"}
        srcDoc={htmlContent}
        height={600}
        width={500}
        data={highlightData}
        highlightPopup={position => (
          <button onClick={() => addHighlightsClick(position)}>
            Add Highlight
          </button>
        )}
        annotationPopup={position => (
          <button onClick={() => removeHighlight(position)}>
            Remove Highlight
          </button>
        )}
      />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
