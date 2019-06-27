import React, { useRef, useState, useLayoutEffect, useEffect } from "react";

function Button({ buttonData, scrollPosition, content, onButtonClick }) {
  const [buttonHeight, changeButtonHeight] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      changeButtonHeight(buttonRef.current.offsetHeight);
    }
  }, [buttonData.type]);

  return (
    <div
      onClick={onButtonClick}
      ref={buttonRef}
      style={{
        left: buttonData.position.left - scrollPosition.scrollX,
        top: buttonData.position.top - scrollPosition.scrollY - buttonHeight,
        position: "absolute",
        zIndex: 1,
        visibility: buttonHeight ? "visible" : "hidden"
      }}
    >
      {content}
    </div>
  );
}
export default Button;
