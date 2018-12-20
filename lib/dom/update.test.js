import update from "./update.js";

describe("update()", () => {
  it("should returns the state returned by the state changer function", done => {
    const element = {
      __currentState__: null
    };

    update(element, () => 42)
      .then(newState => {
        expect(newState).toBe(42);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(newState => {
        expect(newState).toBe(43);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(newState => {
        expect(newState).toBe(44);
        done();
      });
  });

  it("should change the __currentState__ property", done => {
    const element = {
      __currentState__: null
    };

    update(element, () => 42)
      .then(newState => {
        expect(element.__currentState__).toBe(42);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(() => {
        expect(element.__currentState__).toBe(43);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(() => {
        expect(element.__currentState__).toBe(44);
        done();
      });
  });
});
