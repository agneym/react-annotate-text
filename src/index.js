import React, { useRef, useState, useEffect } from "react";
import SelectionButton from "./selection-button";
import { findButtonPosition } from "./functions/findButtonPosition";
import { structureClientRectangle } from "./functions/structureClientRectangle";

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

  const print = () => {
    console.log("scrollPosition print", scrollPosition);
  };

  const onMouseUp = () => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const selectionText = selection.toString();
    if (selectionText) {
      const range = selection.getRangeAt(0);
      const clientRectangleArray = range.getClientRects();
      const position = structureClientRectangle(
        clientRectangleArray,
        scrollPosition
      );
      console.log(
        "clientRectangleArray",
        clientRectangleArray,
        "position",
        scrollPosition
      );

      changeCurrentSelectionData({
        position,
        selectionText
      });
      print();
      const buttonPosition = findButtonPosition(position);
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
    iframeRef.current.contentDocument.addEventListener("scroll", onScroll);
    iframeRef.current.contentDocument.addEventListener("mouseup", onMouseUp);
    iframeRef.current.contentDocument.addEventListener("click", onClick);
    return () => {
      iframeRef.current.contentDocument.removeEventListener("scroll", onScroll);
      iframeRef.current.contentDocument.removeEventListener(
        "mouseup",
        onMouseUp
      );
      iframeRef.current.contentDocument.removeEventListener("click", onClick);
    };
  }, [scrollPosition]);

  useEffect(() => {
    // console.log("buttonPosition", buttonData);
    console.log("use effect mount", scrollPosition);
    // console.log("currentSelectionData", currentSelectionData);
  }, []);

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
