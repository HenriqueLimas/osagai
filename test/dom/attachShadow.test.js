import define from "../../lib/define";
import { update, attachShadow } from "../../lib/dom";

describe("attachShadow()", () => {
  it("should render the template in the shadowRoot", () => {
    const Component = ({ element }) => {
      attachShadow(element);

      return () => `<div class="fromShadow">From Shadow</div>`;
    };

    define("shadow-root-template", Component);

    const element = document.createElement("shadow-root-template");
    document.body.appendChild(element);

    expect(element.querySelector(".fromShadow")).toBe(null);
    expect(element.shadowRoot.querySelector(".fromShadow").textContent).toBe(
      "From Shadow"
    );
  });

  it("should update the shadowRoot", async () => {
    const Component = ({ element }) => {
      attachShadow(element);

      return (name = "Joe") => `<div class="name">${name}</div>`;
    };

    define("shadow-root-update", Component);

    const element = document.createElement("shadow-root-update");
    document.body.appendChild(element);

    await update(element, () => "Ford Prefect");

    expect(element.shadowRoot.querySelector(".name").textContent).toBe(
      "Ford Prefect"
    );
  });

  it("should be able to query the child element", async () => {
    let _query;

    const Component = ({ element, query }) => {
      attachShadow(element);
      _query = query;

      return () => `<div class="name">Joe</div>`;
    };

    define("shadow-root-query", Component);

    const element = document.createElement("shadow-root-query");
    document.body.appendChild(element);

    const name = await _query(".name");

    expect(name.textContent).toBe("Joe");
  });

  it("should be able to query all the children elements", async () => {
    let _queryAll;

    const Component = ({ element, queryAll }) => {
      attachShadow(element);
      _queryAll = queryAll;

      return () => `<ul>
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
      </ul>`;
    };

    define("shadow-root-query-all", Component);

    const element = document.createElement("shadow-root-query-all");
    document.body.appendChild(element);

    const items = await _queryAll(".item");

    expect(items[0].textContent).toBe("Item 1");
    expect(items[1].textContent).toBe("Item 2");
  });

  it("should update the shadowRoot with more than one child", async () => {
    const Component = ({ element }) => {
      attachShadow(element);

      const initialState = {
        state: "loading"
      };

      return ({ state, items = [] } = initialState) => `
      <button class="btn" id="onlyButton">Click me</button>
      ${state === "loading" ? '<span class="loading">Loading...</span>' : ""}
      ${
        state === "loaded"
          ? `<ul class="list">
          ${items.map(item => `<li>${item.name}</li>`).join("")}
        </ul>`
          : ""
      }`;
    };

    define("shadow-root-update-children", Component);

    const element = document.createElement("shadow-root-update-children");
    document.body.appendChild(element);

    expect(element.shadowRoot.querySelector(".btn").textContent).toBe(
      "Click me"
    );
    expect(element.shadowRoot.querySelector(".loading").textContent).toBe(
      "Loading..."
    );

    await update(element, () => ({
      state: "loaded",
      items: [{ name: "Ford Prefect" }]
    }));

    expect(element.shadowRoot.querySelector(".btn").textContent).toBe(
      "Click me"
    );
    expect(element.shadowRoot.querySelector(".loading")).toBe(null);
    const list = element.shadowRoot.querySelector(".list");

    expect(list.querySelector("li").textContent).toBe("Ford Prefect");
  });
});
