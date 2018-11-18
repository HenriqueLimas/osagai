const on = (event, elementQuery, callback) =>
  (!elementQuery.then ? Promise.resolve(elementQuery) : elementQuery).then(
    element => {
      element.addEventListener(event, callback);
    }
  );

export default on;
