const on = (event, elementQuery, callback) =>
  elementQuery.then(element => {
    element.addEventListener(event, callback);
  });

export default on;
