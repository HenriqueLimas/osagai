import define from "./define";

describe("define()", () => {
  function BaseElement() {
    this.querySelector = jest.fn();
    this.querySelectorAll = jest.fn();
  }

  beforeEach(jest.clearAllMocks);

  it("should return an object with the name and the component class definition", () => {
    function Component() {}

    expect(define("x-component", Component)).toEqual({
      name: "x-component",
      component: expect.any(Function)
    });
  });

  it("should define the customElement", () => {
    function Component() {}
    const spyDefine = jest.spyOn(customElements, "define");

    define("x-component", Component);

    expect(spyDefine).toHaveBeenCalledWith(
      "x-component",
      expect.any(Function),
      {}
    );

    spyDefine.mockRestore();
  });

  it("should extends the BaseElement passed", () => {
    function Component() {}

    const { component } = define("x-component", Component, { BaseElement });

    expect(new component()).toBeInstanceOf(BaseElement);
  });

  it("should set the innerHTML property with the returned value of the template", () => {
    function Component() {
      return () => "<div>Template</div>";
    }

    const { component } = define("x-component", Component, {
      BaseElement
    });

    expect(new component().innerHTML).toBe("<div>Template</div>");
  });

  it("should not set the innerHTML property when there is not template function", () => {
    const testCaseValues = [undefined, null, 42, "string", true, {}];

    testCaseValues.forEach(testCaseValue => {
      function Component() {
        return testCaseValue;
      }

      const { component: Template } = define("x-component", Component, {
        BaseElement
      });

      expect(new Template().innerHTML).toBe(undefined);
    });
  });

  it("should inject the public properties", done => {
    function Component({ element, query, queryAll, update }) {
      expect(element).toBeDefined();
      expect(query).toBeDefined();
      expect(queryAll).toBeDefined();
      expect(update).toBeDefined();

      done();
      return;
    }

    const { component } = define("x-component", Component, {
      BaseElement
    });

    new component();
  });

  describe("element", () => {
    it("should be the instance of the component", () => {
      let _element;

      function Component({ element }) {
        _element = element;
      }

      const { component } = define("x-component", Component, {
        BaseElement
      });

      const instance = new component();

      expect(instance).toBeDefined();
      expect(_element).toBe(instance);
    });
  });

  describe("query()", () => {
    it("should querySelector the element", done => {
      let _query;

      function Component({ query }) {
        _query = query;
      }

      const { component } = define("x-component", Component, {
        BaseElement
      });

      const instance = new component();

      _query(".class").then(() => {
        expect(instance.querySelector).toBeCalledWith(".class");
        done();
      });
    });
  });

  describe("queryAll()", () => {
    it("should querySelectorAll the element", done => {
      let _queryAll;

      function Component({ queryAll }) {
        _queryAll = queryAll;
      }

      const { component } = define("x-component", Component, {
        BaseElement
      });

      const instance = new component();

      _queryAll(".class").then(() => {
        expect(instance.querySelectorAll).toBeCalledWith(".class");
        done();
      });
    });
  });

  describe("update()", () => {
    it("should returns the state returned by the state changer function", done => {
      let _update;

      function Component({ update }) {
        _update = update;
      }

      const { component } = define("x-component", Component, {
        BaseElement
      });

      new component();

      _update(() => 42)
        .then(newState => {
          expect(newState).toBe(42);
        })
        .then(() => {
          return _update(currentState => currentState + 1);
        })
        .then(newState => {
          expect(newState).toBe(43);
        })
        .then(() => {
          return _update(currentState => currentState + 1);
        })
        .then(newState => {
          expect(newState).toBe(44);
          done();
        });
    });
  });
});
