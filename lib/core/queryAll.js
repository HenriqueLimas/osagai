import root from "./root.js";

const queryAll = element => q =>
  Promise.resolve().then(() => root(element).querySelectorAll(q));

export default queryAll;
