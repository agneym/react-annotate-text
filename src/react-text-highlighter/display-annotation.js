import React, { useEffect, useState } from "react";

function DisplayAnnotaion({ data, iframeElementRef }) {
  const [iframePosition, changeIframePosition] = useState(null);
  useEffect(() => {
    iframeElementRef.current.contentDocument.addEventListener("scroll", () => {
      console.log(
        "scroll inside annotation",
        iframeElementRef.current.contentWindow.scrollY
      );
      changeIframePosition({
        scrollY: iframeElementRef.current.contentWindow.scrollY,
        scrollX: iframeElementRef.current.contentWindow.scrollX
      });
      //changeIframePosition(null)
    });
  }, []);

  let content = data.map((singleAnnotation, idOut) => {
    return Array.from(singleAnnotation.client).map((rectangle, idIn) => {
      return (
        <div
          key={idOut + "c" + idIn}
          style={{
            position: "absolute",
            height: rectangle.height,
            top: iframePosition
              ? rectangle.top - iframePosition.scrollY
              : rectangle.top,
            left: iframePosition
              ? rectangle.left - iframePosition.scrollX
              : rectangle.left,
            width: rectangle.width,
            backgroundColor: "yellow",
            opacity: 0.2
          }}
        ></div>
      );
    });
  });
  return content;
}
export default DisplayAnnotaion;
