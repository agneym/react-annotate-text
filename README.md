# usePip

<a href="https://www.npmjs.com/package/react-annotate-text">
  <img src="https://img.shields.io/npm/v/react-annotate-text.svg" />
</a>
<a href="https://prettier.io">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>

A custom React hook to use [Picture in Picture](https://wicg.github.io/picture-in-picture/) mode in [supported browsers](https://caniuse.com/#feat=picture-in-picture).

[Demo](https://boywithsilverwings.github.io/usePip)

## Installation

```bash
npm install react-annotate-text
```

Feel free to replace with yarn counterparts.

## Usage:

```javascript
import ReactAnnoteText from "react-annotate-text";

const { loading, error, toggle } = usePip(videoRef);
```

See example directory for complete code.

### Parameters:

| Parameter |        description        | required? | default |
| :-------: | :-----------------------: | :-------: | :-----: |
| videoRef  | Ref for the video element |   true    |  null   |

### Return:

|  Name   |   Type   |                                                                           Description                                                                           |
| :-----: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| loading | boolean  |                                                     Manages loading time for setting for detecting support                                                      |
|  error  |  string  | Error state as described by [spec](https://wicg.github.io/picture-in-picture/). Holds value `NotSupportedError` if browser or video does not support attribute. |
| toggle  | function |                                                                toggles state of PiP in document                                                                 |

## Contributing

1. Install dependencies

```
npm install
```

2. Run dev for lib

```
npm run dev
```

3. Run demo

```
npm start
```
