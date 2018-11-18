const queryAll = element => q =>
  Promise.resolve().then(() => element.querySelectorAll(q));

export default queryAll;
