import React, { useRef } from "react";
import AddHighlightButton from "./add-hightlight-button";
import DisplayAnnotaions from "./display-annotation";

function ReactTextHighlight({
  src,
  srcDoc,
  height,
  width,
  data,
  highlightPopup,
  annotationPopup,
  iframeTitle
}) {
  const iframeElementRef = useRef(null);
  return (
    <div
      style={{
        width: width,
        height: height,
        overflow: "hidden",
        position: "relative"
      }}
    >
      <iframe
        src={src}
        srcDoc={srcDoc}
        width={width}
        height={height}
        title={iframeTitle}
        ref={iframeElementRef}
      ></iframe>
      <AddHighlightButton
        content={highlightPopup}
        iframeElementRef={iframeElementRef}
      />
      <DisplayAnnotaions
        data={data}
        width={width}
        height={height}
        iframeElementRef={iframeElementRef}
        annotationPopup={annotationPopup}
      />
    </div>
  );
}

export default ReactTextHighlight;
