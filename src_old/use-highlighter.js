import { useEffect, useState, useLayoutEffect } from "react";

function useHighlighter(containerElement) {
  const [position, setPosition] = useState(null);
  // useLayoutEffect(() => {
  //   console.log("iframe container", document.getElementById("iframeContainer").contentDocument)
  //   document.getElementById('iframeContainer').contentDocument.addEventListener("click",()=>{console.log("dsd")})
  // });
  useEffect(() => {
    const onMouseUp = () => {
      console.log("mouse up");
      const selection = document
        .getElementById("iframeContainer")
        .contentWindow.getSelection();
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

    document.getElementById("iframeContainer").addEventListener("load", () => {
      console.log("loaded");
      document
        .getElementById("iframeContainer")
        .contentDocument.addEventListener("mouseup", onMouseUp);
    });
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("scroll", onScroll);
      containerElement.current.removeEventListener("scroll", onScroll);
    };
  }, []);
  return {
    position
  };
}

export default useHighlighter;
