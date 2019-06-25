import React, { useEffect, useState } from "react";
import { findButtonPosition } from "./functions";

function AddHighlightButton({ content: Content, iframeElementRef }) {
  const [position, changePosition] = useState(null);
  const [buttonPosition, changeButtonPosition] = useState(null);
  const [iframePosition, changeIframePosition] = useState(null);

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

  useEffect(() => {
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
    if (iframeElementRef.current.contentDocument) {
      iframeElementRef.current.contentDocument.addEventListener(
        "mouseup",
        onMouseUp
      );
      iframeElementRef.current.contentDocument.addEventListener(
        "scroll",
        onScrollHandler
      );
    } else {
      console.log("Iframe not loaded");
    }
    return () => {};
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
    return null;
  } else {
    return (
      <div
        className="react-text-highlighter-add-hightlight-button"
        onClick={addButtonClick}
        style={{
          left: buttonPosition.left,
          top: buttonPosition.top - 20,
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
