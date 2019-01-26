import define from "../lib/define.js";

describe("define", () => {
  it("should create custom element", () => {
    define("hello-world", () => () => "Hello");

    const wrapper = document.createElement("hello-world");
    document.body.appendChild(wrapper);

    expect(wrapper.textContent).toBe("Hello");
  });

  it("should not thrown on defining the element more than one time", () => {
    expect(() => {
      define("same-element", () => () => "Hello 1");
      define("same-element", () => () => "Hello 2");
    }).not.toThrow();
  });

  it('should have a "element" property that represent the element', () => {
    let _elm;

    define("element-test", ({ element }) => {
      _elm = element;
    });

    const elmTest = document.createElement("element-test");

    expect(elmTest).toBe(_elm);
  });

  it('should have a "query" method that query the element in the tree', () => {
    let _query;

    define("query-test", ({ query }) => {
      _query = query;

      return () => '<div id="findMe">Found</div>';
    });

    const queryTest = document.createElement("query-test");
    document.body.appendChild(queryTest);

    return _query("#findMe").then(element => {
      expect(element.textContent).toBe("Found");
    });
  });

  it('should have a "queryAll" method that query the element in the tree', () => {
    let _queryAll;

    define("query-all-test", ({ queryAll }) => {
      _queryAll = queryAll;

      return () => `<div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>`;
    });

    const queryAllTest = document.createElement("query-all-test");
    document.body.appendChild(queryAllTest);

    return _queryAll("li").then(elements => {
      expect(elements.length).toBe(3);
      elements.forEach((elm, i) => {
        expect(elm.textContent).toBe(i + 1 + "");
      });
    });
  });
});
