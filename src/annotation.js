import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

function Annotaion({ highlightData, scrollPosition, changeCurrentHoverData }) {
  console.log("highlightData Annotaion", highlightData);
  const onMouseOver = id => {
    console.log(id);
    //changeHoverButtonValue(id);
  };

  const findAnnotations = () => {
    return highlightData.map(singleAnnotation => {
      return singleAnnotation.position.map((rectangle, index) => {
        return (
          <div key={singleAnnotation.id + "_" + index}>
            <div
              onMouseOver={() => onMouseOver(singleAnnotation.id)}
              id={singleAnnotation.id}
              style={{
                position: "absolute",
                height: rectangle.height,
                top: rectangle.top - scrollPosition.scrollY,
                left: rectangle.left - scrollPosition.scrollX,
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
                top: rectangle.top - scrollPosition.scrollY,
                left: rectangle.left - scrollPosition.scrollX,
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
  };

  return <div className="annotations">{findAnnotations()}</div>;
}
export default Annotaion;
