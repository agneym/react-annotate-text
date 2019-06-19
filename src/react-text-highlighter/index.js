import React, { useRef } from "react";
import AddHighlightButton from "./add-hightlight-button";
import DisplayAnnotaions from "./display-annotation";
import "./styles.css";

function Annotations({ src, srcDoc, height, width, data, addHighlightsClick }) {
  const iframeElementRef = useRef(null);
  return (
    <div
      className="react-text-highlighter-container"
      style={{
        width: width,
        height: height,
        overflow: "hidden"
      }}
    >
      <iframe
        className={"react-text-highlighter-iframe"}
        src={src}
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
      <DisplayAnnotaions data={data} iframeElementRef={iframeElementRef} />
    </div>
  );
}

export default Annotations;
