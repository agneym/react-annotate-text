export const structureClientRectangle = (
  clientRectangleArray,
  scrollPosition
) => {
  return Array.from(clientRectangleArray).map(item => {
    return {
      left: item.left + scrollPosition.scrollX,
      top: item.top + scrollPosition.scrollY,
      height: item.height,
      width: item.width
    };
  });
};
