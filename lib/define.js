import query from "./core/query.js";
import queryAll from "./core/queryAll.js";
import updateDom from "./core/updateDom.js";

const define = (
  name,
  Element,
  {
    BaseElement = HTMLElement,
    observedAttributes,
    ...customElementOptions
  } = {}
) => {
  class Component extends BaseElement {
    static get observedAttributes() {
      return observedAttributes;
    }

    constructor() {
      super();

      let currentState;

      this._initialized = false;
      this.__handleAttributeChangedCallback__ = function() {};

      this._template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this),
        update: (stateChanger = () => {}) =>
          Promise.resolve(stateChanger(currentState)).then(nextState => {
            return new Promise(resolve => {
              requestAnimationFrame(() => {
                currentState = nextState;

                if (this._shouldUpdate) {
                  updateDom(
                    this.childNodes[0],
                    this._templateWithClearing(currentState)
                  );
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
        this.innerHTML = this._templateWithClearing();
      }
    }

    _templateWithClearing(state) {
      return this._template(state).trim();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.isConnected) {
        return;
      }

      this.__handleAttributeChangedCallback__.call(this, {
        name,
        current: newValue,
        old: oldValue
      });
    }
  }

  customElements.define(name, Component, customElementOptions);

  return {
    name,
    component: Component
  };
};

export default define;
