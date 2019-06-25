import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { findButtonPosition } from "./functions/findButtonPosition.js";

function AddHighlightButton({ content: Content, iframeElementRef }) {
  const [position, changePosition] = useState(null);
  const [buttonPosition, changeButtonPosition] = useState(null);
  const [iframePosition, changeIframePosition] = useState(null);
  const [buttonDimensions, changeButtonDimensions] = useState(null);
  const addButton = useRef(null);
  const addButtonClick = () => {
    changeButtonPosition(null);
    Array.from(position.client).forEach(item => {
      item.correctedTop = iframePosition
        ? item.top + iframePosition.scrollY
        : item.top;
      item.correctedLeft = iframePosition
        ? item.left + iframePosition.scrollX
        : item.left;
    });
  };
  const onScrollHandler = () => {
    changeButtonPosition(null);
    changeIframePosition({
      scrollY: iframeElementRef.current.contentWindow.scrollY,
      scrollX: iframeElementRef.current.contentWindow.scrollX
    });
  };
  const onMouseUp = () => {
    const selection = iframeElementRef.current.contentWindow.getSelection();
    const selectionText = selection.toString();
    if (selectionText) {
      const range = selection.getRangeAt(0);
      const client = range.getClientRects();
      changePosition({
        client,
        selectionText
      });
    } else {
      changePosition(null);
    }
  };

  useEffect(() => {
    iframeElementRef.current.addEventListener("load", () => {
      iframeElementRef.current.contentDocument.addEventListener(
        "mouseup",
        onMouseUp
      );
      iframeElementRef.current.contentDocument.addEventListener(
        "scroll",
        onScrollHandler
      );
    });
    return () => {};
  }, []);

  useLayoutEffect(() => {
    if (addButton.current && !buttonDimensions) {
      const height = addButton.current.offsetHeight;
      changeButtonDimensions(height);
    }
  }, []);

  useEffect(() => {
    if (position) {
      const buttonPosition = findButtonPosition(Array.from(position.client));
      changeButtonPosition(buttonPosition);
    } else {
      changeButtonPosition(null);
    }
  }, [position]);

  if (!buttonPosition) {
    return <div ref={addButton}>{Content(position)}</div>;
  } else {
    return (
      <div
        className="react-text-highlighter-add-hightlight-button"
        onClick={addButtonClick}
        style={{
          left: buttonPosition.left,
          top: buttonDimensions
            ? buttonPosition.top - buttonDimensions
            : buttonPosition.top,
          position: "absolute",
          zIndex: 1
        }}
      >
        {Content(position)}
      </div>
    );
  }
}

export default AddHighlightButton;
