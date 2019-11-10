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
});
