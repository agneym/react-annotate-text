import React, { useEffect, useState } from "react";

function DisplayAnnotaion({ data, iframeElementRef }) {
  const [iframePosition, changeIframePosition] = useState(null);
  useEffect(() => {
    iframeElementRef.current.contentDocument.addEventListener("scroll", () => {
      changeIframePosition({
        scrollY: iframeElementRef.current.contentWindow.scrollY,
        scrollX: iframeElementRef.current.contentWindow.scrollX
      });
    });
  }, []);

  let content = data.map((singleAnnotation, idOut) => {
    return Array.from(singleAnnotation.client).map((rectangle, idIn) => {
      return (
        <div
          key={idOut + "+" + idIn}
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
            opacity: 0.2
          }}
        ></div>
      );
    });
  });
  return (
    <div
      style={
        {
          // height:height,
          // width:width
        }
      }
    >
      {content}
    </div>
  );
}
export default DisplayAnnotaion;
