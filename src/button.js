import React, { useRef, useState, useLayoutEffect } from "react";

function Button({ buttonData, scrollPosition, content }) {
  const [buttonHeight, changeButtonHeight] = useState(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (buttonRef.current && !buttonHeight) {
      changeButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  return (
    <div
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
