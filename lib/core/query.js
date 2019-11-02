import root from "./root.js";

const query = element => q =>
  Promise.resolve().then(() => root(element).querySelector(q));

export default query;
