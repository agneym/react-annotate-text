import React, { useEffect, useState } from "react";

function AddHighlightButton({ addHighlightsClick, iframeElementRef }) {
  const [position, changePosition] = useState(null);
  const [buttonPosition, changeButtonPosition] = useState(null);

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

  // const changePosition = value => {
  //   if (value) {
  //     // addHighlightsClick(value);//callback
  //     const addButtonPosition = findAddButtonPosition(Array.from(value.client));
  //     changeposition({ ...value, addButtonPosition });
  //   } else {
  //     changeposition(null);
  //   }
  // };

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
    iframeElementRef.current.contentDocument.addEventListener("scroll", () => {
      changeButtonPosition(null);
      console.log("scroll");
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
        onClick={() => addHighlightsClick(position)}
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
