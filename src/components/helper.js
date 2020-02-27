export const setStyle = function(obj) {
  for (let x in obj) {
    this.style[x] = obj[x];
  }
};
