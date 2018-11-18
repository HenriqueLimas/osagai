import morphdom from "morphdom";

import query from "./core/query.js";
import queryAll from "./core/queryAll.js";

const define = (
  name,
  Element,
  { BaseElement = HTMLElement, ...customElementOptions } = {}
) => {
  class Component extends BaseElement {
    constructor() {
      super();

      const template = Element({
        query: query(this),
        queryAll: queryAll(this),
        update: stateChanger => {
          this._currentState = stateChanger(this._currentState);

          requestAnimationFrame(() => {
            morphdom(this.childNodes[0], template(this._currentState));
          });
        }
      });

      this.innerHTML = template(this._currentState);
    }
  }

  customElements.define(name, Component, customElementOptions);

  return {
    name,
    component: Component
  };
};

export default define;
