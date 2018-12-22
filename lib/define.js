import query from "./core/query.js";
import queryAll from "./core/queryAll.js";

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

      this._initialized = false;
      this.__handleAttributeChangedCallback__ = function() {};
      this.__currentState__ = undefined;

      this.template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this)
      });

      this._shouldUpdate = this.template && typeof this.template === "function";
    }

    connectedCallback() {
      if (this._shouldUpdate && !this._initialized) {
        this._initialized = true;
        this._render(this.__currentState__);
      }
    }

    _render(state) {
      const templateResult = this.template(state);
      if (templateResult && templateResult.getHTML) {
        this.innerHTML = templateResult.getHTML();
      } else {
        this._shouldUpdate = false;
      }
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
