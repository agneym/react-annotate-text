import React, { useEffect, useState } from "react";

function AddHighlightButton({ addHighlightsClick, iframeElementRef }) {
  const [position, changePosition] = useState(null);
  const [buttonPosition, changeButtonPosition] = useState(null);
  const [iframePosition, changeIframePosition] = useState(null);

  const findAddButtonPosition = clientRectangleArray => {
    let neededIndex = 0;
    let leastTop = clientRectangleArray[0].top;
    clientRectangleArray.forEach((element, index) => {
      if (element.top < leastTop) {
        neededIndex = index;
        leastTop = clientRectangleArray[index].top;
      }
    });
    return clientRectangleArray[neededIndex];
  };

  const addButtonClick = () => {
    Array.from(position.client).forEach(item => {
      item.correctedTop = iframePosition
        ? item.top + iframePosition.scrollY
        : item.top;
      item.correctedLeft = iframePosition
        ? item.left + iframePosition.scrollX
        : item.left;
    });
    addHighlightsClick(position);
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
        const placeholderEl = document.createElement("span");
        range.insertNode(placeholderEl);
        const bounding = placeholderEl.getBoundingClientRect();
        const client = range.getClientRects();
        changePosition({
          bounding,
          client,
          selectionText
        });
      } else {
        changePosition(null);
      }
    };

    iframeElementRef.current.addEventListener("load", () => {
      iframeElementRef.current.contentDocument.addEventListener(
        "mouseup",
        onMouseUp
      );
      iframeElementRef.current.contentDocument.addEventListener(
        "scroll",
        () => {
          onScrollHandler();
        }
      );
    });

    return () => {
      iframeElementRef.current.contentDocument.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };
  }, []);

  useEffect(() => {
    if (position) {
      const buttonPosition = findAddButtonPosition(Array.from(position.client));
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
          position: "absolute"
        }}
      >
        Add highlight
      </div>
    );
  }
}

export default AddHighlightButton;
