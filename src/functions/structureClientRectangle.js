export const structureClientRectangle = (
  clientRectangleArray,
  scrollPosition
) => {
  console.log("scrollPosition", scrollPosition);
  return Array.from(clientRectangleArray).map(item => {
    return {
      left: item.left + scrollPosition.scrollX,
      top: item.top + scrollPosition.scrollY,
      height: item.height + scrollPosition.scrollY,
      width: item.width + scrollPosition.scrollX
    };
  });
};
