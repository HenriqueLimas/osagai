import update from "./update.js";
import updateDom from "../core/updateDom.js";

jest.mock("../core/updateDom.js", () => jest.fn());

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

  it("should call _templateWithClearing with the nextState", done => {
    const element = {
      __currentState__: null,
      _templateWithClearing: jest.fn(),
      _shouldUpdate: true,
      childNodes: []
    };

    update(element, () => 42)
      .then(newState => {
        expect(element._templateWithClearing).toHaveBeenCalledWith(42);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(() => {
        expect(element._templateWithClearing).toHaveBeenCalledWith(43);
      })
      .then(() => {
        return update(element, currentState => currentState + 1);
      })
      .then(() => {
        expect(element._templateWithClearing).toHaveBeenCalledWith(44);
        done();
      });
  });

  it("should call updateDom with the root and the template result", done => {
    const child = { _id: "Child" };

    const element = {
      __currentState__: null,
      _templateWithClearing: () => "template",
      _shouldUpdate: true,
      childNodes: [child]
    };

    update(element, () => 42).then(() => {
      expect(updateDom).toHaveBeenCalledWith(element.childNodes[0], "template");
      done();
    });
  });
});
