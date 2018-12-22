import { html, update } from "../node_modules/osagai/dom.mjs";

function TdTodos({ element, query }) {
  update(element, async (currentState = {}) => {
    const model = await query("td-model");
    currentState.getTodos = model.filter;
    currentState.hasCompleted = model.hasCompleted;
    return currentState;
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const value = event.target.elements["new-todo"].value;

    update(element, async currentState => {
      const model = await query("td-model");
      model.addTodo(value);
      return currentState;
    });
  };

  const handleRemove = event => {
    const elm = event.target;
    const id = elm.dataset.id;

    update(element, async currentState => {
      const model = await query("td-model");
      model.removeTodo(id);
      return currentState;
    });
  };

  const handleToggle = event => {
    const elm = event.target;
    const id = elm.dataset.id;

    update(element, async currentState => {
      const model = await query("td-model");
      model.toggleTodo(id);
      return currentState;
    });
  };

  const handleFilter = filter => event => {
    event.preventDefault();
    update(element, currentState => {
      currentState.filter = filter;
      return currentState;
    });
  };

  const handleClearCompleted = () => {
    update(element, async currentState => {
      const model = await query("td-model");
      model.removeCompleted();
      return currentState;
    });
  };

  return ({
    getTodos = () => [],
    filter = "all",
    hasCompleted = () => false,
    todos = getTodos(filter)
  } = {}) =>
    html`
      <section>
        <td-model></td-model>

        <header class="header">
          <form @submit=${handleSubmit}>
            <input
              id="new-todo"
              name="new-todo"
              class="new-todo"
              placeholder="What needs to be done"
              autofocus
              autocomplete="off"
            />
          </form>
        </header>

        <main class="main">
          <ul class="todo-list">
            ${
              todos.map(
                item =>
                  html`
                    <li
                      data-id="${item.id}"
                      class="${item.completed ? "completed" : ""}"
                    >
                      <div class="view">
                        <input
                          data-id="${item.id}"
                          class="toggle"
                          type="checkbox"
                          @click=${handleToggle}
                          checked="${item.completed}"
                        />
                        <label>${item.title}</label>
                        <button
                          data-id="${item.id}"
                          @click=${handleRemove}
                          class="destroy"
                        ></button>
                      </div>
                    </li>
                  `
              )
            }
          </ul>
        </main>

        ${
          todos.length || filter === "completed"
            ? html`
                <footer class="footer">
                  <span class="todo-count">
                    <strong>${todos.length}</strong>
                    <span>item${todos.length > 1 ? "s" : ""}</span>
                    <span>left</span>
                  </span>

                  <ul class="filters">
                    <li>
                      <a
                        href="#/"
                        class="${filter === "all" ? "selected" : ""}"
                        @click=${handleFilter("all")}
                        >All</a
                      >
                    </li>
                    <li>
                      <a
                        href="#/active"
                        class="${filter === "active" ? "selected" : ""}"
                        @click=${handleFilter("active")}
                        >Active</a
                      >
                    </li>
                    <li>
                      <a
                        href="#/completed"
                        class="${filter === "completed" ? "selected" : ""}"
                        @click=${handleFilter("completed")}
                        >Completed</a
                      >
                    </li>
                  </ul>

                  ${
                    hasCompleted()
                      ? html`
                          <button class="clear-completed">
                            Clear completed
                          </button>
                        `
                      : ""
                  }
                </footer>
              `
            : ""
        }
      </section>
    `;
}

export default osagai.define("td-todos", TdTodos);
