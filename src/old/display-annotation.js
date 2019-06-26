import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { findButtonPosition } from "./functions/findButtonPosition.js";

function DisplayAnnotaion({ data, iframeElementRef, annotationPopup }) {
  const [iframePosition, changeIframePosition] = useState(null);
  const [hoverButtonValue, changeHoverButtonValue] = useState(null);
  const [buttonDimensions, changeButtonDimensions] = useState(null);
  const hoverButton = useRef(null);

  useLayoutEffect(() => {
    if (hoverButton.current && !buttonDimensions) {
      const height = hoverButton.current.offsetHeight;
      changeButtonDimensions(height);
    }
  }, []);

  useEffect(() => {
    iframeElementRef.current.addEventListener("load", () => {
      iframeElementRef.current.contentDocument.addEventListener(
        "scroll",
        () => {
          changeHoverButtonValue(null);
          changeIframePosition({
            scrollY: iframeElementRef.current.contentWindow.scrollY,
            scrollX: iframeElementRef.current.contentWindow.scrollX
          });
        }
      );

      iframeElementRef.current.contentDocument.addEventListener("click", () => {
        changeHoverButtonValue(null);
      });
    });
  }, []);

  const onMouseOver = id => {
    changeHoverButtonValue(id);
  };
  const onClick = () => {
    changeHoverButtonValue(null);
  };

  const displayHoverButton = () => {
    if (hoverButtonValue) {
      const hoveredAnnotaion = data.find(item => {
        return item.id === hoverButtonValue;
      });
      const buttonPosition = findButtonPosition(
        Array.from(hoveredAnnotaion.client)
      );
      return (
        <div
          onClick={onClick}
          style={{
            position: "absolute",
            top: iframePosition
              ? buttonPosition.correctedTop -
                iframePosition.scrollY -
                buttonDimensions
              : buttonPosition.top - buttonDimensions,
            left: iframePosition
              ? buttonPosition.correctedLeft - iframePosition.scrollX
              : buttonPosition.left,
            zIndex: 1
          }}
        >
          {annotationPopup(hoverButtonValue)}
        </div>
      );
    } else {
      return <div ref={hoverButton}>{annotationPopup(hoverButtonValue)}</div>;
    }
  };

  let content = data.map(singleAnnotation => {
    return Array.from(singleAnnotation.client).map((rectangle, index) => {
      return (
        <div key={singleAnnotation.id + "_" + index}>
          <div
            onMouseOver={() => onMouseOver(singleAnnotation.id)}
            id={singleAnnotation.id}
            style={{
              position: "absolute",
              height: rectangle.height,
              top: iframePosition
                ? rectangle.correctedTop - iframePosition.scrollY
                : rectangle.correctedTop,
              left: iframePosition
                ? rectangle.correctedLeft - iframePosition.scrollX
                : rectangle.correctedLeft,
              width: rectangle.width,
              backgroundColor: "none",
              opacity: 1
            }}
          ></div>
          <div
            id={singleAnnotation.id}
            style={{
              position: "absolute",
              height: rectangle.height,
              top: iframePosition
                ? rectangle.correctedTop - iframePosition.scrollY
                : rectangle.correctedTop,
              left: iframePosition
                ? rectangle.correctedLeft - iframePosition.scrollX
                : rectangle.correctedLeft,
              width: rectangle.width,
              backgroundColor: "yellow",
              opacity: 1,
              zIndex: -1
            }}
          ></div>
        </div>
      );
    });
  });
  return (
    <div className="annotations">
      {content}
      {displayHoverButton()}
    </div>
  );
}
export default DisplayAnnotaion;
