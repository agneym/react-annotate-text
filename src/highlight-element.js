import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const highlightRoot = document.getElementById("highlight-root");

function HighlightElement({ position, addHighlight, contentPositions }) {
  const containerEl = useRef(null);
  const highlightPopup = useRef(null);
  const [loading, setLoading] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    containerEl.current = document.createElement("div");
    highlightRoot.appendChild(containerEl.current);
    setLoading(false);
    return () => {
      highlightRoot.removeChild(containerEl.current);
    };
  }, []);
  useLayoutEffect(() => {
    if (highlightPopup.current) {
      const height = highlightPopup.current.offsetHeight;
      setContentHeight(height);
    }
  }, [loading]);

  const onAddButtonClick = () => {
    let highlightRectangles = Array.from(position.client);
    highlightRectangles.forEach(rectangle => {
      rectangle.correctedTop =
        rectangle.top + contentPositions.scrollTop - contentPositions.offsetTop;
      rectangle.correctedLeft = rectangle.left - contentPositions.offsetLeft;
    });
    console.log("position.client", position.client);
    addHighlight(highlightRectangles);
  };

  if (containerEl.current) {
    return createPortal(
      <div
        style={{
          position: "fixed",
          top: position.bounding.y - contentHeight,
          left: position.bounding.x,
          opacity: !!contentHeight ? 1 : 0
        }}
        ref={highlightPopup}
      >
        <div style={{ backgroundColor: "red", padding: "0.5rem" }}>
          <button onClick={onAddButtonClick}>Add Highlight</button>
        </div>
      </div>,
      containerEl.current
    );
  } else {
    return null;
  }
}

HighlightElement.propTypes = {
  position: PropTypes.object.isRequired
};

export default HighlightElement;
