import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import ReactTextHighlight from "./react-text-highlighter/index";
import { htmlContent } from "./const";

function App() {
  const addHighlights = () => {
    console.log("addHighlights");
  };

  return (
    <div className="app-container">
      <div className="left">left</div>
      <div className="right">
        right
        <ReactTextHighlight
          src={null}
          srcDoc={htmlContent}
          height={600}
          width={500}
          data={[]}
          addHighlights={addHighlights}
        />
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
