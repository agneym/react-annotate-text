import React, { useEffect } from "react";

function AddHighlightButton({ addHighlightsClick, iframeElementRef }) {
  const setPosition = value => {
    if (value) {
      addHighlightsClick(value);
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
        setPosition({
          bounding,
          client,
          selectionText
        });
      } else {
        setPosition(null);
      }
    };

    iframeElementRef.current.contentDocument.addEventListener(
      "mouseup",
      onMouseUp
    );
    return () => {
      iframeElementRef.current.contentDocument.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };
  }, []);
  return (
    <div className="react-text-highlighter-add-hightlight-button">
      Add highlight
    </div>
  );
}

export default AddHighlightButton;
