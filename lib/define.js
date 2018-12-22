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
      this.__handleConnectedCallback__ = function() {};
      this.__handleDisconnectedCallback__ = function() {};
      this.__currentState__ = undefined;

      this._template = Element({
        element: this,
        query: query(this),
        queryAll: queryAll(this)
      });

      this._shouldUpdate =
        this._template && typeof this._template === "function";
    }

    connectedCallback() {
      this.__handleConnectedCallback__.call(this);

      if (this._shouldUpdate && !this._initialized) {
        this._initialized = true;
        this.innerHTML = this._templateWithClearing(this.__currentState__);
      }
    }

    disconnectedCallback() {
      this.__handleDisconnectedCallback__.call(this);
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
