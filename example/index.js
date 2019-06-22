import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTextHighlight from "../src/index";

import { htmlContent } from "./const";
import "./styles.css";

function App() {
  const [highlightData, setHighighlight] = useState([]);
  const addHighlightsClick = value => {
    setHighighlight([...highlightData, value]);
  };
  useEffect(() => {
    console.log("highlightData", highlightData);
  }, [highlightData]);
  return (
    <div className="container">
      <ReactTextHighlight
        //src={"http://sednaenergy.in/"}
        srcDoc={htmlContent}
        height={600}
        width={500}
        data={highlightData}
        addHighlightsClick={addHighlightsClick}
      />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
