import React, { useRef, useState, useEffect } from "react";
import SelectionButton from "./selection-button";
import { findButtonPosition } from "./functions/findButtonPosition";

function ReactTextHighlight({
  src,
  srcDoc,
  height,
  width,
  data,
  selectionPopup,
  hoverPopup,
  iframeTitle
}) {
  const [currentSelectionData, changeCurrentSelectionData] = useState(null);
  const [buttonData, changeButtonData] = useState(null);
  const [scrollPosition, changeScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0
  });
  const iframeRef = useRef(null);
  const onMouseUp = () => {
    console.log("onMouseUp");
    const selection = iframeRef.current.contentWindow.getSelection();
    const selectionText = selection.toString();
    if (selectionText) {
      const range = selection.getRangeAt(0);
      const client = range.getClientRects();
      changeCurrentSelectionData({
        client,
        selectionText
      });
      const buttonPosition = findButtonPosition(Array.from(client));
      changeButtonData({ type: "select", position: buttonPosition });
    } else {
      changeCurrentSelectionData(null);
      changeButtonData(null);
    }
  };
  const onScroll = () => {
    changeScrollPosition({
      scrollY: iframeRef.current.contentWindow.scrollY,
      scrollX: iframeRef.current.contentWindow.scrollX
    });
  };
  const onClick = () => {};
  const renderButton = () => {
    if (buttonData) {
      if (buttonData.type === "select") {
        return (
          <SelectionButton
            buttonData={buttonData}
            scrollPosition={scrollPosition}
            content={selectionPopup(currentSelectionData)}
          />
        );
      } else if (buttonData.type === "hover") {
        return null;
        // <HoverButton
        //   position={buttonData.position}
        //   content={}
        // />
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    iframeRef.current.addEventListener("load", () => {
      console.log("load");
      iframeRef.current.contentDocument.addEventListener("scroll", onScroll);
      iframeRef.current.contentDocument.addEventListener("mouseup", onMouseUp);
      iframeRef.current.contentDocument.addEventListener("click", onClick);
    });
  }, []);

  useEffect(() => {
    console.log("buttonPosition", buttonData);
    console.log("scrollPosition", scrollPosition);
    console.log("currentSelectionData", currentSelectionData);
  });

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
        ref={iframeRef}
      ></iframe>
      {renderButton()}
    </div>
  );
}

export default ReactTextHighlight;
