import React, { useRef } from "react";
import "./styles.css";
import AddHighlightButton from "./add-hightlight-button";
function Annotations({ src, srcDoc, height, width, data, addHighlightsClick }) {
  const iframeElementRef = useRef(null);
  return (
    <div className="react-text-highlighter-container">
      <iframe
        className={"react-text-highlighter-iframe"}
        srcDoc={srcDoc}
        width={width}
        height={height}
        title={"my iframe"}
        ref={iframeElementRef}
        id="react-text-highlighter-iframe"
      ></iframe>
      <AddHighlightButton
        addHighlightsClick={addHighlightsClick}
        iframeElementRef={iframeElementRef}
      />
    </div>
  );
}

export default Annotations;
