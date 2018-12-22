import { fetchItems } from "./api.js";

export const fetchItemsAction = ({ update }) => {
  update(() => ({
    state: "loading"
  }));

  fetchItems().then(items =>
    update(() => ({
      items,
      state: "loaded"
    }))
  );
};
