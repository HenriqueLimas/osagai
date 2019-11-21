import define from "../../lib/define";
import { update } from "../../lib/dom";

describe("update()", () => {
  it("should update the root", async () => {
    const Component = ({ element }) => {
      return (name = "Joe") => `<div class="name">${name}</div>`;
    };

    define("update-root", Component);

    const element = document.createElement("update-root");
    document.body.appendChild(element);

    await update(element, () => "Ford Prefect");

    expect(element.querySelector(".name").textContent).toBe("Ford Prefect");
  });

  it("should update the root with more complex DOM", async () => {
    const Component = ({ element }) => {
      const initialState = {
        state: "loading"
      };

      return ({ state, items = [] } = initialState) => `
      <div>
      <button class="btn" id="onlyButton">Click me</button>
      ${state === "loading" ? '<span class="loading">Loading...</span>' : ""}
      ${
        state === "loaded"
          ? `<ul class="list">
          ${items.map(item => `<li>${item.name}</li>`).join("")}
        </ul>`
          : ""
      }</div>`;
    };

    define("update-children", Component);

    const element = document.createElement("update-children");
    document.body.appendChild(element);

    expect(element.querySelector(".btn").textContent).toBe("Click me");
    expect(element.querySelector(".loading").textContent).toBe("Loading...");

    await update(element, () => ({
      state: "loaded",
      items: [{ name: "Ford Prefect" }]
    }));

    expect(element.querySelector(".btn").textContent).toBe("Click me");
    expect(element.querySelector(".loading")).toBe(null);
    const list = element.querySelector(".list");

    expect(list.querySelector("li").textContent).toBe("Ford Prefect");

    await update(element, () => ({
      state: "loaded",
      items: [{ name: "Ford Prefect" }, { name: "John Due" }]
    }));

    expect(list.querySelectorAll("li")[0].textContent).toBe("Ford Prefect");
    expect(list.querySelectorAll("li")[1].textContent).toBe("John Due");
  });
});
