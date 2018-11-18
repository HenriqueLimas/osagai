function TdModel({ element }) {
  const STORAGE_KEY = "model";

  Object.assign(element, {
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    addTodo: title => {
      element.todos.push({
        id: Date.now().toString(),
        title,
        completed: false
      });

      updateStorage(element);

      return element.todos;
    },
    removeTodo: id => {
      element.todos = element.todos.filter(todo => todo.id !== id);
      updateStorage(element);
      return element.todos;
    },
    toggleTodo: id => {
      element.todos = element.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      });

      updateStorage(element);

      return element.todos;
    },
    filter: (filter = "all") => {
      switch (filter) {
        case "all":
          return element.todos;
        case "active":
          return element.filterActive();
        case "completed":
          return element.filterCompleted();
        default:
          return element.todos;
      }
    },
    filterCompleted: () => element.todos.filter(todo => todo.completed),
    filterActive: () => element.todos.filter(todo => !todo.completed),
    removeCompleted: () => {
      element.todos = element.filterActive();
      updateStorage(element);
      return element.todos;
    },
    hasCompleted: () => element.filterCompleted().length
  });

  const updateStorage = element => {
    Promise.resolve().then(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(element.todos));
      element = null;
    });
  };

  return () => "";
}

export default osagai.define("td-model", TdModel);
