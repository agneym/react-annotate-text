import React from "react";

function Annotations({ highlights, contentPositions }) {
  return highlights.map(highlight => {
    return Array.from(highlight).map((rect, index) => (
      <span
        key={index}
        style={{
          position: "absolute",
          top: rect.correctedTop - contentPositions.scrollTop,
          left: rect.left - contentPositions.left,
          width: rect.width,
          opacity: 0.2,
          height: rect.height,
          backgroundColor: "yellow"
        }}
      ></span>
    ));
  });
}

export default Annotations;
