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
});
