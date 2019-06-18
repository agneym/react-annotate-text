import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { htmlFile } from "./const";
import "./styles.css";
import useHighlighter from "./use-highlighter";
import HighlightElement from "./highlight-element";
import Annotations from "./annotations";

function App() {
  const containerElement = useRef(null);
  const { position } = useHighlighter(containerElement);
  const [highlights, setHighlights] = useState([]);
  const [contentPositions, setContentPositions] = useState({
    offsetLeft: 0,
    offsetTop: 0,
    scrollLeft: 0,
    scrollTop: 0
  });
  const onWindowScroll = () => {
    let boundingRect = containerElement.current.getBoundingClientRect();
    setContentPositions(previousPosition => ({
      ...previousPosition,
      offsetTop: boundingRect.top,
      offsetLeft: boundingRect.left
    }));
  };

  const onScroll = () => {
    console.log("scroll", containerElement.current.contentWindow.scrollY);

    setContentPositions(previousPosition => ({
      ...previousPosition,
      scrollTop: containerElement.current.contentWindow.scrollY,
      scrollLeft: containerElement.current.scrollLeft
    }));
  };

  useLayoutEffect(() => {
    document.getElementById("iframeContainer").addEventListener("load", () => {
      console.log("loaded");
      document
        .getElementById("iframeContainer")
        .contentDocument.addEventListener("scroll", () => {
          onScroll();
        });
    });
    window.addEventListener("scroll", onWindowScroll);
    setContentPositions(previousPosition => ({
      ...previousPosition,
      offsetLeft: containerElement.current.offsetLeft,
      offsetTop: containerElement.current.offsetTop
    }));
  }, []);

  // const loaded=() => {
  //   console.log("iframe container", document.getElementById("iframeContainer").contentDocument)
  //   document.getElementById('iframeContainer').contentDocument.addEventListener("click",()=>{console.log("dsd")})
  // }

  const addHighlights = highlight => {
    setHighlights(prevHighlights => [...prevHighlights, highlight]);
  };

  return (
    <div className="App">
      <iframe
        ref={containerElement}
        srcDoc={htmlFile}
        width="540"
        height="450"
        title="my iframe"
        id="iframeContainer"
        //onLoad={loaded}
      ></iframe>
      <Annotations
        highlights={highlights}
        contentPositions={contentPositions}
      />
      {position && (
        <HighlightElement
          position={position}
          addHighlight={addHighlights}
          contentPositions={contentPositions}
        />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
