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

      this._initialized = false;

      this._template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this),
        update: stateChanger =>
          Promise.resolve(stateChanger(currentState)).then(nextState => {
            return new Promise(resolve => {
              requestAnimationFrame(() => {
                currentState = nextState;

                if (this._shouldUpdate) {
                  updateDom(this.childNodes[0], this._template(currentState));
                }

                resolve(nextState);
              });
            });
          })
      });

      this._shouldUpdate =
        this._template && typeof this._template === "function";
    }

    connectedCallback() {
      if (this._shouldUpdate && !this._initialized) {
        this._initialized = true;
        this.innerHTML = this._template();
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
