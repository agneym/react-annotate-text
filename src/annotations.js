import React from "react";

function Annotations({ highlights }) {
  return highlights.map(highlight => {
    return Array.from(highlight).map((rect, index) => (
      <span
        key={index}
        style={{
          position: "fixed",
          top: rect.top,
          left: rect.left,
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
