import React, { useEffect, useState } from "react";

function DisplayAnnotaion({ data }) {
  console.log("data", data);
  let content = data.map((singleAnnotation, idOut) => {
    console.log(singleAnnotation);
    return Array.from(singleAnnotation.client).map((rectangle, idIn) => {
      console.log(rectangle.top);
      return (
        <div
          key={idOut + "c" + idIn}
          style={{
            position: "absolute",
            height: rectangle.height,
            top: rectangle.top,
            left: rectangle.left,
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
