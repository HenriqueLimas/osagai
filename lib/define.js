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

      const template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this),
        update: stateChanger =>
          Promise.resolve(stateChanger(this._currentState)).then(nextState => {
            return new Promise(resolve => {
              requestAnimationFrame(() => {
                this._currentState = nextState;
                updateDom(this.childNodes[0], template(this._currentState));
                resolve(nextState);
              });
            });
          })
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
