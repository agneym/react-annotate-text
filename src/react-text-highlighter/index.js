import React from "react";
import "./styles.css";
import AddHighlightButton from "./add-hightlight-button";
function Annotations({ src, srcDoc, height, width, data, addHighlights }) {
  return (
    <div className="react-text-highlighter-container">
      <iframe
        className={"react-text-highlighter-iframe"}
        srcDoc={srcDoc}
        width={width}
        height={height}
        title={"my iframe"}
      ></iframe>
      <AddHighlightButton addHighlights={addHighlights} />
    </div>
  );
}

export default Annotations;
