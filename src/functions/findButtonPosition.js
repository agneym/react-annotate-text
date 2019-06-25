export const findButtonPosition = clientRectangleArray => {
  return clientRectangleArray.reduce((least, item) => {
    if (item.top < least.top) {
      least = item;
    }
    return least;
  }, clientRectangleArray[0]);
};
