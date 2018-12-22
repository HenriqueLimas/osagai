import { on } from "../node_modules/osagai/events.mjs";
import { update } from "../node_modules/osagai/dom.mjs";

function TdTodos({ element, query }) {
  update(element, async (currentState = {}) => {
    const model = await query("td-model");
    currentState.getTodos = model.filter;
    currentState.hasCompleted = model.hasCompleted;
    return currentState;
  });

  on("submit", query(".js-form"), async event => {
    event.preventDefault();
    const value = event.target.elements["new-todo"].value;

    update(element, async currentState => {
      const model = await query("td-model");
      model.addTodo(value);
      return currentState;
    });
  });

  on("click", element, async event => {
    const elm = event.target;

    if (elm.classList.contains("destroy")) {
      const id = elm.dataset.id;
      return update(element, async currentState => {
        const model = await query("td-model");
        model.removeTodo(id);
        return currentState;
      });
    }

    if (elm.classList.contains("toggle")) {
      const id = elm.dataset.id;
      return update(element, async currentState => {
        const model = await query("td-model");
        model.toggleTodo(id);
        return currentState;
      });
    }

    if (elm.classList.contains("js-all")) {
      event.preventDefault();
      return update(element, currentState => {
        currentState.filter = "all";
        return currentState;
      });
    }

    if (elm.classList.contains("js-active")) {
      event.preventDefault();
      return update(element, currentState => {
        currentState.filter = "active";
        return currentState;
      });
    }

    if (elm.classList.contains("js-completed")) {
      event.preventDefault();
      return update(element, currentState => {
        currentState.filter = "completed";
        return currentState;
      });
    }

    if (elm.classList.contains("clear-completed")) {
      return update(element, async currentState => {
        const model = await query("td-model");
        model.removeCompleted();
        return currentState;
      });
    }
  });

  return ({
    getTodos = () => [],
    filter = "all",
    hasCompleted = () => false,
    todos = getTodos(filter)
  } = {}) =>
    `<section>
      <td-model></td-model>

      <header class="header">
        <form class="js-form">
          <input id="new-todo" name="new-todo" class="new-todo" placeholder="What needs to be done" autofocus autocomplete="off">
        </form>
      </header>

      <main class="main">
        <ul class="todo-list">
          ${todos
            .map(
              item =>
                `<li data-id="${item.id}" class="${
                  item.completed ? "completed" : ""
                }">
                  <div class="view">
                    <input data-id="${
                      item.id
                    }" class="toggle" type="checkbox" ${
                  item.completed ? "checked" : ""
                }>
                    <label>${item.title}</label>
                    <button data-id="${item.id}" class="destroy"></button>
                  </div>
                </li>`
            )
            .join("")}
        </ul>
      </main>

      ${
        todos.length || filter === "completed"
          ? `
      <footer class="footer">
        <span class="todo-count">
          <strong>${todos.length}</strong>
          <span>item${todos.length > 1 ? "s" : ""}</span>
          <span>left</span>
        </span>

        <ul class="filters">
          <li>
            <a href="#/" class="js-all ${
              filter === "all" ? "selected" : ""
            }">All</a>
          </li>
          <li>
            <a href="#/active" class="js-active ${
              filter === "active" ? "selected" : ""
            }">Active</a>
          </li>
          <li>
            <a href="#/completed" class="js-completed ${
              filter === "completed" ? "selected" : ""
            }">Completed</a>
          </li>
        </ul>

        ${
          hasCompleted()
            ? `<button class="clear-completed">Clear completed</button>`
            : ""
        }
      </footer>
      `
          : ""
      }
    </section>`;
}

export default osagai.define("td-todos", TdTodos);
