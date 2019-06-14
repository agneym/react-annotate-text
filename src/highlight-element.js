import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const highlightRoot = document.getElementById("highlight-root");
function HighlightElement({ position }) {
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
  if (containerEl.current) {
    return createPortal(
      <div
        style={{
          position: "fixed",
          top: position.y - contentHeight,
          left: position.x,
          opacity: !!contentHeight ? 1 : 0
        }}
        ref={highlightPopup}
      >
        <p style={{ backgroundColor: "red" }}>Highlight content</p>
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
