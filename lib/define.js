import query from "./core/query.js";
import queryAll from "./core/queryAll.js";
import updateDom from "./core/updateDom.js";

const define = (
  name,
  Element,
  { BaseElement = HTMLElement, ...customElementOptions } = {}
) => {
  class Component extends BaseElement {
    constructor() {
      super();

      let currentState;

      const template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this),
        update: stateChanger =>
          Promise.resolve(stateChanger(currentState)).then(nextState => {
            return new Promise(resolve => {
              requestAnimationFrame(() => {
                currentState = nextState;

                if (shouldUpdate) {
                  updateDom(this.childNodes[0], template(currentState));
                }

                resolve(nextState);
              });
            });
          })
      });

      const shouldUpdate = template && typeof template === "function";

      if (shouldUpdate) {
        this.innerHTML = template();
      }
    }
  }

  customElements.define(name, Component, customElementOptions);

  return {
    name,
    component: Component
  };
};

export default define;
