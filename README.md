# Osagai

A tiny library in the browser way.

```js
import { define } from "osagai";
import { on } from "osagai/events";

function Hello({ update, query }) {
  on("click", query(".btn"), () => {
    update(currentState => {
      currentState.items.push({
        name: "New one"
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
```
