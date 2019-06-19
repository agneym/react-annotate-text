import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import ReactTextHighlight from "./react-text-highlighter/index";
import { htmlContent } from "./const";
function App() {
  const [highlightData, setHighighlight] = useState([]);
  const addHighlightsClick = value => {
    setHighighlight([...highlightData, value]);
  };

  return (
    <div className="app-container">
      <div className="left">left</div>
      <div className="right">
        right
        <ReactTextHighlight
          //src={"http://sednaenergy.in/"}
          srcDoc={htmlContent}
          height={600}
          width={500}
          data={highlightData}
          addHighlightsClick={addHighlightsClick}
        />
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
