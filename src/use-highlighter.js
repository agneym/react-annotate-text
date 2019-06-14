import { useEffect, useState } from "react";

function useHighlighter() {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    const onMouseUp = event => {
      const selection = window.getSelection();
      const selectionText = selection.toString();
      if (selectionText) {
        const range = selection.getRangeAt(0);
        const placeholderEl = document.createElement("span");
        range.insertNode(placeholderEl);
        const box = placeholderEl.getBoundingClientRect();
        setPosition(box);
      } else {
        setPosition(null);
      }
    };
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  return {
    position
  };
}

export default useHighlighter;
