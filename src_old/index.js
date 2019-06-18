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
    // let boundingRect = containerElement.current.getBoundingClientRect();
    // setContentPositions(previousPosition => ({
    //   ...previousPosition,
    //   offsetTop: boundingRect.top,
    //   offsetLeft: boundingRect.left
    // }));
  };

  const onScroll = () => {
    let boundingRect = containerElement.current.getBoundingClientRect();
    setContentPositions(previousPosition => ({
      ...previousPosition,
      scrollTop: containerElement.current.contentWindow.scrollY,
      scrollLeft: containerElement.current.scrollLeft,
      offsetTop: boundingRect.top,
      offsetLeft: boundingRect.left
    }));
  };

  useLayoutEffect(() => {
    document.getElementById("iframeContainer").addEventListener("load", () => {
      document
        .getElementById("iframeContainer")
        .contentDocument.addEventListener("scroll", () => {
          onScroll();
        });
      let boundingRect = containerElement.current.getBoundingClientRect();
      setContentPositions(previousPosition => ({
        ...previousPosition,
        offsetLeft: boundingRect.left,
        offsetTop: boundingRect.top
      }));
    });
    window.addEventListener("scroll", onWindowScroll);
  }, []);

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
      <div id="highlight-root"></div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
