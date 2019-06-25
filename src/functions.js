export const findButtonPosition = clientRectangleArray => {
  let neededIndex = 0;
  let leastTop = clientRectangleArray[0].top;
  clientRectangleArray.forEach((element, index) => {
    if (element.top < leastTop) {
      neededIndex = index;
      leastTop = clientRectangleArray[index].top;
    }
  });
  return clientRectangleArray[neededIndex];
};
