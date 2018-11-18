const query = element => q =>
  Promise.resolve().then(() => element.querySelector(q));

export default query;
