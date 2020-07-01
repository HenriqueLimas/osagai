import query from "./core/query.js";
import queryAll from "./core/queryAll.js";
import root from "./core/root.js";

// detection 'borrowed' from https://github.com/ungap/custom-elements-builtin
function browserSupportsExtendingNativeElements() {
  var EXTENDS = 'extends';
  try {
    // class LI extends HTMLLIElement {}
    var desc = {};
    desc[EXTENDS] = 'li';
    var HtmlLI = HTMLLIElement;
    var LI = function () {
      return Reflect.construct(HtmlLI, [], LI);
    };
    LI.prototype = Object.create(HtmlLI.prototype);
    customElements.define('osagai-li', LI, desc);
    if (!/is="osagai-li"/.test((new LI).outerHTML)) {
      throw desc;
    }
  } catch (o_O) {
    return false;
  }
  
  return true;
}

const
   isExtendingBuiltinsSupportedNatively = browserSupportsExtendingNativeElements(),
   
   // For compatibility with the @ungap/custom-elements-builtin polyfill
   // initialisation needs to be separated from the constructor
   // see https://github.com/ungap/custom-elements-builtin#constructor-caveat
   initialisedExtendedBuiltins = new WeakSet(),
   
   initialiseExtendedBuiltin = (node, renderer, theElementFunction, isExtendedBuiltinWithPolyfill) => {
    if (isExtendedBuiltinWithPolyfill) {
      initialisedExtendedBuiltins.add(node);
    }
    node._initialized = false;
    node.__handleAttributeChangedCallback__ = new Set();
    node.__handleConnectedCallback__ = [];
    node.__handleDisconnectedCallback__ = [];
    node.__currentState__ = undefined;
    node.__hasCustomRenderer__ = !!renderer;
    node.__renderer__ =
        renderer ||
        function renderer(element, template) {
          root(element).innerHTML = template;
        };

    node._template = theElementFunction({
        element: node,
        query: query(node),
        queryAll: queryAll(node)
      });

    node._shouldUpdate =
        node._template && typeof node._template === "function";
  },
   
   define = (
  name,
  Element,
  {
    BaseElement = HTMLElement,
    observedAttributes,
    renderer,
    ...customElementOptions
  } = {}
) => {
  const
     isExtendedBuiltinElement = BaseElement !== HTMLElement && typeof customElementOptions.extends === 'string',
     isExtendedBuiltinViaPolyfill = isExtendedBuiltinElement && !isExtendingBuiltinsSupportedNatively;
  
  class Component extends BaseElement {
    static get observedAttributes() {
      return Element.observedAttributes || observedAttributes;
    }

    constructor() {
      super();
      
      initialiseExtendedBuiltin(this, renderer, Element, isExtendedBuiltinViaPolyfill);
    }

    connectedCallback() {
       if (isExtendedBuiltinViaPolyfill) {
        if (!initialisedExtendedBuiltins.has(this)) {
          initialiseExtendedBuiltin(this, renderer, Element, true);
        }
      }
      
      if (this._shouldUpdate && !this._initialized) {
        this._initialized = true;
        this.__renderer__(
          this,
          this._templateWithClearing(this.__currentState__)
        );
      }

      this.__handleConnectedCallback__.forEach(function(callback) {
        callback();
      });
    }

    disconnectedCallback() {
      this.__handleDisconnectedCallback__.forEach(function(callback) {
        callback();
      });
    }

    _templateWithClearing(state) {
      const template = this._template(state);

      return typeof template === "string" ? template.trim() : template;
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (isExtendedBuiltinViaPolyfill) {
        if (!initialisedExtendedBuiltins.has(this)) {
          initialiseExtendedBuiltin(this, renderer, Element, true);
        }
      }
      
      if (!this.isConnected) {
        return;
      }

      this.__handleAttributeChangedCallback__.forEach(function(callback) {
        callback({
          attributeName,
          current: newValue,
          old: oldValue
        });
      });
    }
  }

  if (!customElements.get(name)) {
    customElements.define(name, Component, customElementOptions);
  }

  return {
    name,
    component: Component
  };
};

export default define;
