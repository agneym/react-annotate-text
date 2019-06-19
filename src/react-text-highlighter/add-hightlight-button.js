import React, { useEffect, useState } from "react";

function AddHighlightButton({ addHighlightsClick, iframeElementRef }) {
  const [positionInside, changePositionInside] = useState(null);

  const findAddButtonPosition = clientRectangleArray => {
    const neededIndex = 0;
    const leastTop = clientRectangleArray[0].top;
    clientRectangleArray.forEach((element, index) => {
      if (clientRectangleArray[index].top < leastTop) {
        neededIndex = index;
        leastTop = clientRectangleArray[index].top;
      }
    });
    return clientRectangleArray[neededIndex];
  };

  const changePosition = value => {
    if (value) {
      // addHighlightsClick(value);//callback
      const addButtonPosition = findAddButtonPosition(Array.from(value.client));
      changePositionInside({ ...value, addButtonPosition });
    } else {
      changePositionInside(null);
    }
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

    iframeElementRef.current.contentDocument.addEventListener(
      "mouseup",
      onMouseUp
    );
    iframeElementRef.current.contentDocument.addEventListener(
      "scroll",
      changePositionInside()
    );
    return () => {
      iframeElementRef.current.contentDocument.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };
  }, []);

  if (!positionInside) {
    return null;
  } else {
    return (
      <div
        className="react-text-highlighter-add-hightlight-button"
        onClick={() => addHighlightsClick(positionInside)}
        style={{
          left: positionInside.addButtonPosition.left,
          top: positionInside.addButtonPosition.top - 20,
          position: "absolute"
        }}
      >
        Add highlight
      </div>
    );
  }
}

export default AddHighlightButton;
