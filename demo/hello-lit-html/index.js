import { define } from "./node_modules/osagai/osagai.mjs";
import { on } from "./node_modules/osagai/events.mjs";
import { update } from "./node_modules/osagai/dom.mjs";
import { fetchItemsAction } from "./actions.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

function Hello({ element, query }) {
  fetchItemsAction({ update: fn => update(element, fn) });

  const handleClick = () => {
    update(element, currentState => {
      currentState.items.push({
        name: "Yaya"
      });

      return currentState;
    });
  };

  return ({ state, items } = {}) =>
    html`
      <div>
        <button class="btn" @click=${handleClick}>Click me</button>

        ${state === "loading" ? "Loading..." : ""}
        ${
          state === "loaded"
            ? html`
                <ul class="list">
                  ${
                    items.map(
                      item =>
                        html`
                          <li>${item.name}</li>
                        `
                    )
                  }
                </ul>
              `
            : ""
        }
      </div>
    `;
}

function litHtmlRenderer(element, template) {
  render(template, element);
}

export default define("x-hello", Hello, { renderer: litHtmlRenderer });
