import { findSelectButtonPosition } from "./findSelectButtonPosition";
export const findHoverButtonPosition = (hoveredId, highlightData) => {
  const selectedData = highlightData.find(function(e) {
    return e.id == hoveredId;
  });
  return findSelectButtonPosition(selectedData.position);
};
