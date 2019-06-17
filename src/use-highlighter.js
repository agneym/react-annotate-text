import { useEffect, useState } from "react";

function useHighlighter() {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    const onMouseUp = () => {
      const selection = window.getSelection();
      const selectionText = selection.toString();
      if (selectionText) {
        const range = selection.getRangeAt(0);
        const placeholderEl = document.createElement("span");
        range.insertNode(placeholderEl);
        const bounding = placeholderEl.getBoundingClientRect();
        const client = range.getClientRects();
        setPosition({
          bounding,
          client
        });
      } else {
        setPosition(null);
      }
    };
    const onScroll = () => {
      setPosition(null);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);
  return {
    position
  };
}

export default useHighlighter;
