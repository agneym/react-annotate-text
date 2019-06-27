import React, { useRef, useState, useEffect } from "react";
import Button from "./button";
import Annotation from "./annotation";
import { findSelectButtonPosition } from "./functions/findSelectButtonPosition";
import { structureClientRectangle } from "./functions/structureClientRectangle";
import { findHoverButtonPosition } from "./functions/findHoverButtonPosition";

function ReactTextHighlight({
  src,
  srcDoc,
  height,
  width,
  highlightData,
  selectionPopup,
  hoverPopup,
  iframeTitle
}) {
  const iframeRef = useRef(null);
  const [currentSelectionData, changeCurrentSelectionData] = useState(null);
  const [currentHoverData, changeCurrentHoverData] = useState(null);
  const [buttonData, changeButtonData] = useState(null);
  const [scrollPosition, changeScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0
  });

  const onMouseUp = () => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const selectionText = selection.toString();
    if (selectionText) {
      const clientRectangleArray = selection.getRangeAt(0).getClientRects();
      const position = structureClientRectangle(
        clientRectangleArray,
        scrollPosition
      );
      changeCurrentSelectionData({
        position,
        selectionText
      });
      changeButtonData({
        type: "select",
        position: findSelectButtonPosition(position)
      });
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

  const onMouseLeave = () => {
    changeCurrentHoverData(null);
    changeButtonData(null);
  };

  const buttonContent = () => {
    if (buttonData.type === "select") {
      return selectionPopup(currentSelectionData);
    } else if (buttonData.type === "hover") {
      return hoverPopup(currentHoverData);
    }
  };

  const hoverChange = hoveredId => {
    console.log("id hovered is", hoveredId);
    if (hoveredId) {
      changeCurrentHoverData(hoveredId);
      changeButtonData({
        type: "hover",
        position: findHoverButtonPosition(hoveredId, highlightData)
      });
    } else {
      changeCurrentHoverData(null);
      changeButtonData(null);
    }
  };

  const onButtonClick = () => {
    changeCurrentSelectionData(null);
    changeCurrentHoverData(null);
    changeButtonData(null);
  };

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentDocument.addEventListener("scroll", onScroll);
      iframeRef.current.contentDocument.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      iframeRef.current.contentDocument.removeEventListener("scroll", onScroll);
      iframeRef.current.contentDocument.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };
  }, [scrollPosition]);

  useEffect(() => {
    //console.log("buttonData from useeffect", buttonData);
    //console.log("use effect mount", scrollPosition);
    // console.log("currentSelectionData", currentSelectionData);
    console.log("highlightData useEffect", highlightData);
  });

  return (
    <div
      onMouseLeave={onMouseLeave}
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
      {highlightData.length && (
        <Annotation
          highlightData={highlightData}
          scrollPosition={scrollPosition}
          hoverChange={hoverChange}
        />
      )}
      {buttonData && (
        <Button
          buttonData={buttonData}
          scrollPosition={scrollPosition}
          content={buttonContent()}
          onButtonClick={onButtonClick}
        />
      )}
    </div>
  );
}

export default ReactTextHighlight;
