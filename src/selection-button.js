import React, { useRef, useState, useEffect } from "react";

function SelectionButton({ buttonData, scrollPosition, content }) {
  return (
    <div
      style={{
        left: buttonData.position.left - scrollPosition.scrollX,
        top: buttonData.position.top - scrollPosition.scrollY,
        position: "absolute",
        zIndex: 1
      }}
    >
      {content}
    </div>
  );
}
export default SelectionButton;
