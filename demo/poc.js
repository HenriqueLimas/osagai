import { define } from "../dist/osagai.mjs";
import { on } from "../dist/events.mjs";
import { fetchItemsAction } from "./actions.js";

function Hello({ update, query }) {
  fetchItemsAction({ update });

  on("click", query(".btn"), () => {
    update(currentState => {
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
