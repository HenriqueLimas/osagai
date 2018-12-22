import { define } from "./node_modules/osagai/osagai.mjs";
import { on } from "./node_modules/osagai/events.mjs";
import { update } from "./node_modules/osagai/dom.mjs";
import { fetchItemsAction } from "./actions.js";

function Hello({ element, query }) {
  fetchItemsAction({ update: fn => update(element, fn) });

  on("click", query(".btn"), () => {
    update(element, currentState => {
      currentState.items.push({
        name: "Yaya"
      });

      return currentState;
    });
  });

  return ({ state, items } = {}) =>
    `<div>
      <button class="btn">Click me</button>

      ${state === "loading" ? "Loading..." : ""}
      ${
        state === "loaded"
          ? `
        <ul class="list">
          ${items.map(item => `<li>${item.name}</li>`).join("")}
        </ul>
      `
          : ""
      }
    </div>`;
}

export default define("x-hello", Hello);
