export const findButtonPosition = position => {
  return position.reduce((least, item) => {
    if (item.top < least.top) {
      least = item;
    }
    return { top: least.top, left: least.left };
  }, position[0]);
};
