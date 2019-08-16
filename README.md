# react-annotate-text

<a href="https://www.npmjs.com/package/react-annotate-text">
  <img src="https://img.shields.io/npm/v/react-annotate-text.svg" />
</a>
<a href="https://prettier.io">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>

A React library to highlight text.

[Demo](https://howareyouami.github.io/react-annotate-text)

## Installation

```bash
npm install react-annotate-text
```

Feel free to replace with yarn counterparts.

## Usage

```javascript
import ReactAnnoteText from "react-annotate-text";
```

```javascript
<ReactAnnotateText
  srcDoc={htmlContent}
  src={htmlURL}
  iframeTitle={"Demo"}
  height={600}
  width={500}
  highlightData={highlightData}
  selectionPopup={position => (
    <button onClick={() => addHighlightClick(position)}>Add Highlight</button>
  )}
  hoverPopup={id => (
    <button onClick={() => removeHighlightClick(id)}>Remove Highlight</button>
  )}
/>
```

See example directory for complete code.

## Contributing

1. Install dependencies

```
npm install
```

2. Build lib

```
npm run transpile
```

3. Run demo

```
npm start
```
